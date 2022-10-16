import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
// import { getSchema } from "./graphql/schema";
import { getSchema } from "@/graphql/schema";

const PORT = process.env.PORT || 8000;

const main = async () => {
    const app = express();
    const httpServer = createServer(app);
    const server = new ApolloServer({
        schema: getSchema(),
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground,
        ],
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api" });

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
};

main();
