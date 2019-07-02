import { gql } from 'apollo-server-express';

export default gql`
  directive @cost(
    multipliers: [String]
    useMultipliers: Boolean
    complexity: Int
  ) on OBJECT | FIELD_DEFINITION
`;
