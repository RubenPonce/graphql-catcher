import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const channels = [
    {
        channelId: "UCAgIOx-Wmvon7nWJiFTzRdg",
        name: "Colorado Ped Patrol",
        lastLive: "3 days ago",
        mediaProvider: "YouTube",
    },
    {
        channelId: "PredatorPoachers",
        name: "Predator Poachers",
        lastLive: "12 hours ago",
        mediaProvider: "Rumble",
    },
    {
        channelId: "UC_z833aw6yvHJ9QxGpphY3w",
        name: "CCUNIT",
        lastLive: "8 hours ago",
        mediaProvider: "YouTube",
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        channels: () => channels,
    },
};
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Channel {
    channelId: String
    name: String
    lastLive: String,
    mediaProvider: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    channels: [Channel]
  }
  type Mutation {
    updateChannel(cn: Channel): String
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
