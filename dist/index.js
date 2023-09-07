import mongoose, { Schema } from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLScalarType } from "graphql";
import dotenv from "dotenv";
import {mutations} from "../src/mutations/index.js";
import {queries} from "../src/queries/index.js";

dotenv.config();
const dateScalar = new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return new Date(value).toISOString();
    },
});
const ChannelSchema = new Schema({
    channelId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    lastLive: {
        type: String,
        required: false,
    },
    isLive: {
        type: Boolean,
        required: true,
    },
    lastUrl: {
        type: String,
        required: false,
    },
    socials: [{
        mediaProvider: { type: String, required: true }
    }],
});
const Channel = mongoose.model("Channel", ChannelSchema);
const resolvers = {
    Date: dateScalar,
    Query: {
        ...queries
    },
    Mutation: {
...mutations
    },
};
const secret = process.env.secretdb;
mongoose.connect(`${secret}`).then(() => {
    console.log("MongoDB connected successfully");
});
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar Date

  type MyType {
       created: Date
  }
  input Channel {
    channelId: String
    name: String
    lastLive: Date
    mediaProvider: String
    isLive: Boolean
    lastUrl: String
  }
  type Channel {
    channelId: String
    name: String
    lastLive: Date
    mediaProvider: String
    isLive: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    channels: [Channel]
  }
  type Mutation{
    createChannel(name: String, channelId: String, mp: String): Channel 
    updateChannel(channelId: String, isLive: Boolean, vidUrl: String): Channel 
  } 
`;
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
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
