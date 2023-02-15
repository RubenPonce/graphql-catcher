import mongoose, { Schema } from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLScalarType } from "graphql";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();
//@TODO enable cors and authorization
//var express = require("express");
//var cors = require("cors");
//var app = express();
//var corsOptions = {
//  origin: "<insert uri of front-end domain>",
//  credentials: true, // <-- REQUIRED backend setting
//};
//app.use(cors(corsOptions));
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
  mediaProvider: { type: String, required: true },
});
const Channel = mongoose.model("Channel", ChannelSchema);
const resolvers = {
  Query: {
    channels: async () => await Channel.find(),
  },
  Mutation: {
    createChannel: async (parent, args, context, info) => {
      const channelObj = new Channel({
        lastLive: new Date(),
        mediaProvider: args.mp,
        channelId: args.channelId,
        name: args.name,
        isLive: false,
        lastUrl: "",
      });
      return await channelObj.save().then((res) => res);
    },
    updateChannel: async (parent, args, context, info) => {
      const filter = { channelId: args.channelId };
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

      const eastDate = formatter.format(new Date());
      //change vidUrl only if a new vidUrl is passed
      const update = args.vidUrl
        ? {
            lastLive: eastDate,
            isLive: args.isLive,
            lastUrl: args.vidUrl,
          }
        : { lastLive: new Date().toISOString(), isLive: args.isLive };
      return await Channel.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });
    },
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
  scalar Date

  type MyType {
       created: Date
  }
  input Channel {
    channelId: String
    name: String
    lastLive: String
    mediaProvider: String
    isLive: Boolean
    lastUrl: String
  }
  type Channel {
    channelId: String
    name: String
    lastLive: String
    mediaProvider: String
    isLive: Boolean
  }

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
