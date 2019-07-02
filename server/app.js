import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';
import costAnalysis from 'graphql-cost-analysis';

import userSchema from './schemas/User';
import programSchema from './schemas/Program';
import { PORT, NODE_ENV, GQL_MAX_COST } from './config';
import config from './package.json';
import costDirectiveTypeDef from './schemas/costDirectiveTypeDef';

const { version } = config;

const init = async () => {
  const schemas = [userSchema, programSchema];

  const server = new ApolloServer({
    schema: mergeSchemas({
      schemas,
    }),
    context: ({ req }) => ({
      isUserRequest: true,
      egoToken: req.headers.authorization,
      dataLoaders: {},
    }),
    introspection: true,
    tracing: NODE_ENV !== 'production',
    validationRules: [
      costAnalysis({
        maximumCost: GQL_MAX_COST,
        // logs out complexity so we can later on come back and decide on appropriate limit
        onComplete: cost => console.log(`QUERY_COST: ${cost}`),
      }),
    ],
  });

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app, path: '/graphql' });
  app.get('/status', (req, res) => {
    res.json(version);
  });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`),
  );
};

init();
