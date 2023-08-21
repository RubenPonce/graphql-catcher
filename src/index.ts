import mongoose from "mongoose";
import AWS from "aws-sdk";
import {readFileSync} from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import {resolvers} from "./resolvers/resolver";
import {InMemoryLRUCache} from "apollo-server-caching";
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


let secret = process.env.secretdb;
if (!secret && process.env.NODE_ENV === 'production') {
  const ssmClient = new AWS.SSM({
    region: 'us-east-1'
  });
  ssmClient.getParameter({
    Name: `/node/secretdb`,
    WithDecryption: true,
  }, (err, data) => {
    if (data?.Parameter) {
      secret = data.Parameter.Value;
    }
  });
}
mongoose.connect(`${secret}`).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.log("unable to connect to MongoDB")
  console.log(err);
})
//@TODO integrate these types with typescript
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache()
});

async function startApolloServer(server) {
  const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer(server);