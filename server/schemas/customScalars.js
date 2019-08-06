import { GraphQLScalarType } from 'graphql';

export default {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A string in simplified extended ISO format',
    serialize(value) {
      if (value instanceof Date) {
        return value.toISOString();
      } else {
        return null;
      }
    },
    parseValue(value) {
      if (!(typeof value === 'string' || value instanceof String)) {
        return null;
      }
      return new Date(dateTime);
    },
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        return null;
      }

      return new Date(ast.value);
    },
  }),
};
