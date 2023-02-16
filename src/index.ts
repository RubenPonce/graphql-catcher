import mongoose, { Schema } from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
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

const ChannelSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  // last time a channel went live
  lastLive: {
    type: String,
    required: false,
  },
  // is currently live
  isLive: {
    type: Boolean,
    required: true,
  },
  //last url from lastLive time
  lastUrl: {
    type: String,
    required: false,
  },
  //platform that the live was streamed on
  mediaProvider: { type: String, required: true },
});
const Channel = mongoose.model("Channel", ChannelSchema);
const resolvers = {
  Query: {
    channels: async () => await Channel.find(),
  },
  Mutation: {
    createChannel: async (parent, args, context, info) => {
      const eastDate = formatter.format(new Date());
      const channelObj = new Channel({
        lastLive: eastDate,
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

      const eastDate = formatter.format(new Date());
      //change vidUrl only if a new vidUrl is passed
      const update = args.vidUrl
        ? {
            lastLive: eastDate,
            isLive: args.isLive,
            lastUrl: args.vidUrl,
          }
        : { lastLive: eastDate, isLive: args.isLive };
      return await Channel.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });
    },
  },
};
mongoose.connect(`${secret}`).then(() => {
  console.log("MongoDB connected successfully");
});
//@TODO integrate these types with typescript
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
