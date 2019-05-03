import { gql } from "apollo-boost";

export const UserQuery = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      name
      id
    }
  }
`;
