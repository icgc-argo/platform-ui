import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { get } from 'lodash';

import programService from '../../services/programService';
import { wrapValue } from '../../utils/grpcUtils';

const typeDefs = gql`
  enum MembershipType {
    FULL
    ASSOCIATE
  }

  type Program {
    id: String
    shortName: String
    description: String
    name: String
    commitmentDonors: Int
    submittedDonors: Int
    genomicDonors: Int
    website: String
    institutions: String
    countries: String
    regions: String
    membershipType: MembershipType

    cancerTypes: [Cancer]
    primarySites: [PrimarySite]

    """
    ISO Formatted DateTime:
    """
    createdAt: String

    """
    ISO Formatted DateTime:
    """
    updatedAt: String
  }
  type Cancer {
    id: String!
    name: String!
  }
  type PrimarySite {
    id: String!
    name: String!
  }
  type ProgramUser {
    id: String
    email: String
    firstName: String
    lastName: String
  }

  input ProgramInput {
    name: String!
    shortName: String!
    description: String!
    commitmentDonors: Int!
    submittedDonors: Int!
    genomicDonors: Int!
    website: String!
    institutions: String!
    countries: String!
    regions: String!

    membershipType: MembershipType!

    cancerTypes: [CancerInput]
    primarySites: [PrimarySiteInput]
  }

  input CancerInput {
    id: String!
    name: String!
  }
  input PrimarySiteInput {
    id: String!
    name: String!
  }

  type Query {
    """
    retrieve Program data by id
    """
    program(id: String!): Program

    """
    retrieve all Programs
    """
    programs: [Program]
  }
  type Mutation {
    """
    create new program
    """
    createProgram(program: ProgramInput): String!
  }
`;

const getISODate = time => (time ? new Date(parseInt(time)).toISOString() : null);

const convertGrpcProgramToGql = program => ({
  id: get(program, 'id.value'),
  name: get(program, 'name.value'),
  shortName: get(program, 'short_name.value'),
  description: get(program, 'description.value'),
  membershipType: get(program, 'membership_type.value'),
  commitmentDonors: get(program, 'commitment_donors.value'),
  submittedDonors: get(program, 'submitted_donors.value'),
  genomicDonors: get(program, 'genomic_donors.value'),
  website: get(program, 'website.value'),
  institutions: get(program, 'institutions.value'),
  countries: get(program, 'countries.value'),
  regions: get(program, 'regions.value'),
  membershipType: get(program, 'membership_type'),
  cancerTypes: get(program, 'cancer_types', []).map(x => convertCancerType(x)),
  primarySites: get(program, 'primary_sites', []).map(x => convertPrimarySite(x)),

  createdAt: getISODate(get(program, 'created_at.seconds')),
  updatedAt: getISODate(get(program, 'updated_at.seconds')),
});

const convertCreateProgramInputToGrpc = program => ({
  name: wrapValue(get(program, 'name')),
  short_name: wrapValue(get(program, 'shortName')),
  description: wrapValue(get(program, 'description')),
  commitment_donors: wrapValue(get(program, 'commitmentDonors')),
  submitted_donors: wrapValue(get(program, 'submittedDonors')),
  genomic_donors: wrapValue(get(program, 'genomicDonors')),
  website: wrapValue(get(program, 'website')),
  institutions: wrapValue(get(program, 'institutions')),
  countries: wrapValue(get(program, 'countries')),
  regions: wrapValue(get(program, 'regions')),

  membership_type: wrapValue(get(program, 'membershipType')),

  cancer_types: get(program, 'cancerTypes', []),
  primary_sites: get(program, 'primarySites', []),
});

const convertCancerType = cancerType => ({
  id: get(cancerType, 'id.value'),
  name: get(cancerType, 'name.value'),
});

const convertPrimarySite = primarySite => ({
  id: get(primarySite, 'id.value'),
  name: get(primarySite, 'name.value'),
});

const resolvers = {
  Query: {
    program: async (obj, args, context, info) => {
      const { egoToken } = context;
      const program = await programService.getProgram(args.id, egoToken);
      return program === null ? null : convertGrpcProgramToGql(program);
    },
    programs: async (obj, args, context, info) => {
      const { egoToken } = context;
      const response = await programService.listPrograms(egoToken);
      const programs = get(response, 'programs', []);
      return programs.map(program => convertGrpcProgramToGql(program));
    },
  },
  Mutation: {
    createProgram: async (obj, args, context, info) => {
      const { egoToken } = context;
      const program = convertCreateProgramInputToGrpc(get(args, 'program', {}));
      const response = await programService.createProgram(program, egoToken);
      return get(response, 'id');
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
