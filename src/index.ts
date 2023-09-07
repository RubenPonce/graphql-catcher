import mongoose from "mongoose";
import {readFileSync} from "fs";
import express from 'express';
import cors from 'cors';
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import http from "http";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {InMemoryLRUCache} from "apollo-server-caching";
import {parse} from "graphql/language";

import {resolvers} from "./resolvers/resolver";
dotenv.config();
const SECRET_KEY = process.env.secretkey
const auth_token = jwt.sign({role: 'ADMIN'}, SECRET_KEY);

console.log('auth_token:', auth_token);
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        req.user = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        req.user = {role: "normie"}
    }
    console.log('req.user:', req.user);

    const query = req.body.query;
    if (query) {
        const ast = parse(query);
        //@ts-ignore
        const operationTypes = ast.definitions.map(def => def.operation);

        if (operationTypes.includes('mutation')) {
            if (!req.user || req.user.role !== 'ADMIN') {
                return res.status(403).json({error: 'Not authorized for mutation'});
            }
        }
    }
    next();
};


const app = express();
const httpServer = http.createServer(app);

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
    // @ts-ignore
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await server.start();
app.use(cors({
    origin: ["https://catcher.tv", "https://www.catcher.tv", "http://localhost:4000", "https://studio.apollographql.com", "http://localhost:3000"]
}));
app.use(express.json());
app.use(authenticate)
app.use('/graphql', expressMiddleware(server));


await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`🚀  Server ready at http://localhost:4000/graphql`);
