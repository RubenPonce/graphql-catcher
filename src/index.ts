import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import {queries} from "./queries"
import {mutations} from "./mutations"
import {ChannelSchema} from "./schemas/ChannelSchema"
import {readFileSync} from "fs";
dotenv.config();
//@TODO enable cors and authorization
//var express = require("express");
//var cors = require("cors");
//var app = express();
//var corsOptions = {
//  origin: "<insert uri of front-end domain>",
//  credentials: true
//};
//app.use(cors(corsOptions));
const secret = process.env.secretdb;
const options: Intl.DateTimeFormatOptions = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const formatter = new Intl.DateTimeFormat([], options);
const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
...mutations,
  },
};
mongoose.connect(`${secret}`).then(() => {
  console.log("MongoDB connected successfully");
});
//@TODO integrate these types with typescript
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
