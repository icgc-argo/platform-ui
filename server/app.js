import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { mergeSchemas } from "graphql-tools";

import createExecutableUserSchema, { createUserLoader } from "./schemas/User";
import createExecutableSearchModel from "./schemas/Arranger";
import { PORT } from "./config";

Promise.all([createExecutableUserSchema(), createExecutableSearchModel()]).then(
  schemas => {
    const server = new ApolloServer({
      schema: mergeSchemas({
        schemas
      }),
      context: ({ req }) => ({
        dataLoaders: {
          userLoader: createUserLoader()
        }
      })
    });

    const app = express();
    app.use(cors());
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  }
);
