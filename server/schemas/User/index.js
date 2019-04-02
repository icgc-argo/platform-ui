import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import DataLoader from "dataloader";

const users = [
  {
    id: 1,
    name: "Jon"
  },
  {
    id: 2,
    name: "Minh"
  },
  {
    id: 3,
    name: "Justin"
  }
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    setUserName(id: ID!, name: String!): User
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (obj, args, context, info) =>
      context.dataLoaders.userLoader.load(args.id)
  },
  Mutation: {
    setUserName: (obj, args, context, info) => {
      const user = context.dataLoaders.userLoader.load(args.id);
      user.name = args.name;
      return user;
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
