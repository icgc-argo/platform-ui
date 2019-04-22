import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { mergeSchemas } from "graphql-tools";

import createExecutableUserSchema, { createUserLoader } from "./schemas/User";
import createExecutableSearchModel from "./schemas/Arranger";
import { PORT } from "./config";
import config from "./package.json";

const { version } = config;

const init = async () => {
  const schemas = await Promise.all([
    createExecutableUserSchema()
    // createExecutableSearchModel()
  ]);

  const server = new ApolloServer({
    schema: mergeSchemas({
      schemas
    }),
    context: ({ req }) => ({
      isUserRequest: true,
      egoToken: req.headers.authorization,
      dataLoaders: {
        userLoader: createUserLoader()
      }
    })
  });

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app, path: "/graphql" });
  app.get("/status", (req, res) => {
    res.json(version);
  });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

init();
