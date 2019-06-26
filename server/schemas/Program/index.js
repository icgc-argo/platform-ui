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

  enum UserRole {
    COLLABORATOR
    ADMIN
    CURATOR
    SUBMITTER
    BANNED
  }

  type Program {
    shortName: String!
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

    cancerTypes: [String]
    primarySites: [String]
  }

  type ProgramUser {
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

    cancerTypes: [String]
    primarySites: [String]

    adminEmails: [String!]!
  }

  input InviteUserInput {
    programShortName: String!
    userFirstName: String!
    userLastName: String!
    userEmail: String!

    userRole: UserRole!
  }

  type Query {
    """
    retrieve Program data by id
    """
    program(shortName: String!): Program

    """
    retrieve all Programs
    """
    programs: [Program]
  }
  type Mutation {
    """
    Create new program
    Returns the shortName of the program if successfully created
    """
    createProgram(program: ProgramInput!): String

    """
    Invite a user to join a program
    Returns the email of the user if the invite is successfully sent
    """
    inviteUser(invite: InviteUserInput!): String
  }
`;

const getISODate = time => (time ? new Date(parseInt(time)).toISOString() : null);

/* =========
    Convert GRPC Response to GQL output
 * ========= */
const convertGrpcProgramToGql = programDetails => {
  return {
    name: get(programDetails, 'program.name.value'),
    shortName: get(programDetails, 'program.short_name.value'),
    description: get(programDetails, 'program.description.value'),
    commitmentDonors: get(programDetails, 'program.commitment_donors.value'),
    submittedDonors: get(programDetails, 'program.submitted_donors.value'),
    genomicDonors: get(programDetails, 'program.genomic_donors.value'),
    website: get(programDetails, 'program.website.value'),
    institutions: get(programDetails, 'program.institutions.value'),
    countries: get(programDetails, 'program.countries.value'),
    regions: get(programDetails, 'program.regions.value'),
    membershipType: get(programDetails, 'program.membership_type.value'),
    cancerTypes: get(programDetails, 'program.cancer_types', []),
    primarySites: get(programDetails, 'program.primary_sites', []),
  };
};

const resolvers = {
  Query: {
    program: async (obj, args, context, info) => {
      const { egoToken } = context;
      const response = await programService.getProgram(args.shortName, egoToken);
      const programDetails = get(response, 'program');
      return response === null ? null : convertGrpcProgramToGql(programDetails);
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
      const program = get(args, 'program', {});
      const response = await programService.createProgram(program, egoToken);
      return get(args, 'program.shortName');
    },
    inviteUser: async (obj, args, context, info) => {
      const { egoToken } = context;
      const invite = get(args, 'invite', {});
      const response = await programService.inviteUser(invite, egoToken);
      return get(args, 'invite.userEmail');
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
