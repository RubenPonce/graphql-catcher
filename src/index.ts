import mongoose from "mongoose";
import {readFileSync} from "fs";
import express from 'express';
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import http from "http";
import * as pkg from "body-parser"

import dotenv from "dotenv";
import {resolvers} from "./resolvers/resolver";
import {InMemoryLRUCache} from "apollo-server-caching";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const {json} = pkg;

const secret = process.env.secretdb;
mongoose.connect(`${secret}`).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("unable to connect to MongoDB");
    console.log(err);
});

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

await server.start();
app.use(cors({
    origin: ["https://catcher.tv", "http://localhost:4000", "https://studio.apollographql.com", "http://localhost:3000"]
}));
app.use(express.json());
app.use('/graphql', expressMiddleware(server));


await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`🚀  Server ready at http://localhost:4000/graphql`);
