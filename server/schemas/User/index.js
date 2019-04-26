import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import DataLoader from "dataloader";

const users = [
  {
    id: 1,
    name: "Jon",
    friends: [2, 3]
  },
  {
    id: 2,
    name: "Minh",
    friends: [3, 4, 1]
  },
  {
    id: 3,
    name: "Dusan",
    friends: [2, 4]
  },
  {
    id: 4,
    name: "Ciaran",
    friends: [1, 3, 2, 4]
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    friends: [User]
  }
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    setUserName(id: ID!, name: String!): User
  }
`;

const userResolver = async (obj, args, context, info) => {
  const { userLoader } = context.dataLoaders;
  const user = await userLoader.load(args.id);
  return {
    ...user,
    friends: () =>
      user.friends.map(id => userResolver(obj, { id }, context, info))
  };
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: async (obj, args, context, info) => {
      const { userLoader } = context.dataLoaders;
      const user = await userLoader.load(args.id);
      return {
        ...user,
        friends: (args, context, info) =>
          user.friends.map(id => userResolver(user, { id }, context, info))
      };
    }
  },
  Mutation: {
    setUserName: async (obj, args, context, info) => {
      const { userLoader } = context.dataLoaders;
      const user = await userLoader.load(args.id);
      user.name = args.name;
      return {
        ...user,
        friends: (args, context, info) =>
          user.friends.map(id => userResolver(user, { id }, context, info))
      };
    }
  }
};

export const createUserLoader = () =>
  new DataLoader(ids =>
    Promise.all(
      ids.map(uid =>
        Promise.resolve(users.find(({ id }) => String(uid) === String(id)))
      )
    )
  );

export default () =>
  Promise.resolve(
    makeExecutableSchema({
      typeDefs,
      resolvers
    })
  );
