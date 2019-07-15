import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { get } from 'lodash';

import programService from '../../services/programService';
import { wrapValue } from '../../utils/grpcUtils';
import costDirectiveTypeDef from '../costDirectiveTypeDef';

const typeDefs = gql`
  ${costDirectiveTypeDef}

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

  type Program @cost(complexity: 10) {
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

    users: [ProgramUser]
  }

  type ProgramUser @cost(complexity: 10) {
    email: String
    firstName: String
    lastName: String
    role: UserRole
  }

  input ProgramUserInput {
    email: String!
    firstName: String!
    lastName: String!
    role: UserRole!
  }

  input ProgramInput {
    name: String!
    shortName: String!
    description: String
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

    admins: [ProgramUserInput!]!
  }

  input UpdateProgramInput {
    name: String
    description: String
    commitmentDonors: Int
    website: String
    institutions: String
    countries: String
    regions: String
    membershipType: MembershipType
    cancerTypes: [String]
    primarySites: [String]
  }

  input InviteUserInput {
    programShortName: String!
    userFirstName: String!
    userLastName: String!
    userEmail: String!

    userRole: UserRole!
  }

  input JoinProgramInput {
    invitationId: String!
    institute: String!
    piFirstName: String!
    piLastName: String!
    department: String!
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
    For lists (Cancer Type, Primary Site, Institution, Regions, Countries) the entire new value must be provided, not just values being added.
    Returns Program object details of created program
    """
    createProgram(program: ProgramInput!): Program @cost(complexity: 10)

    """
    Update Program
    Returns shortName of the program if succesfully updated
    """
    updateProgram(shortName: String!, updates: UpdateProgramInput!): String @cost(complexity: 10)

    """
    Invite a user to join a program
    Returns the email of the user if the invite is successfully sent
    """
    inviteUser(invite: InviteUserInput!): String @cost(complexity: 10)

    """
    Join a program by accepting an invitation
    Returns the user data
    """
    joinProgram(join: JoinProgramInput!): ProgramUser @cost(complexity: 10)
  }
`;

const getISODate = time => (time ? new Date(parseInt(time)).toISOString() : null);

/* =========
    Convert GRPC Response to GQL output
 * ========= */
const convertGrpcProgramToGql = programDetails => ({
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
});

const convertGrpcUserToGql = user => ({
  email: get(user, 'email.value'),
  firstName: get(user, 'first_name.value'),
  lastName: get(user, 'last_name.value'),
  role: get(user, 'role.value'),
});

const resolvers = {
  Program: {
    users: async (program, args, context, info) => {
      const { egoToken } = context;
      const response = await programService.listUsers(program.shortName, egoToken);
      const users = get(response, 'users', []);
      return users.map(convertGrpcUserToGql);
    },
  },
  Query: {
    program: async (obj, args, context, info) => {
      const { egoToken } = context;
      const response = await programService.getProgram(args.shortName, egoToken);
      const programDetails = get(response, 'program');
      return response ? null : convertGrpcProgramToGql(programDetails);
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
      const createResponse = await programService.createProgram(program, egoToken);
      const programResponse = await programService.getProgram(
        get(args, 'program.shortName'),
        egoToken,
      );
      const programDetails = get(programResponse, 'program');
      return programResponse === null ? null : convertGrpcProgramToGql(programDetails);
    },
    updateProgram: async (obj, args, context, info) => {
      const { egoToken } = context;
      const updates = get(args, 'updates', {});
      const shortName = get(args, 'shortName', {});
      const response = await programService.updateProgram(shortName, updates, egoToken);
      return response === null ? null : get(args, 'shortName');
    },
    inviteUser: async (obj, args, context, info) => {
      const { egoToken } = context;
      const invite = get(args, 'invite', {});
      const response = await programService.inviteUser(invite, egoToken);
      return get(args, 'invite.userEmail');
    },
    joinProgram: async (obj, args, context, info) => {
      const { egoToken } = context;
      const joinProgramInput = get(args, 'join', {});
      const response = await programService.joinProgram(joinProgramInput, egoToken);
      return convertGrpcUserToGql(get(response, 'user'));
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
