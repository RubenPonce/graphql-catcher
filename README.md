![what-the-hecking-logo-is-this](https://github.com/RubenPonce/grahql-catcher/assets/43939942/2d4e65cb-c8e9-478b-9583-8c2f2b40870e)





A GraphQL NodeJS server for delivering content to the frontend of Catcher. 


## Installation

```bash
npm install
```
```bash
npm start
```
starts on localhost:4000/graphql
## Current Features
- delivers RSS content to the frontend through mongodb
- CRUD operations for Catching Channels
- CRUD operations for Content(only stores updated content)
## Usage
The two mutation that do the heavy lifting
- updateChannel gets the channel information from the channel's rss feed and updates the database that uses another serviec I call the [pollerexploionservice](https://github.com/RubenPonce/pollerexplosionservice) and stores it in Mongodb
- latestContent inserts the latest (recent 30) content from all the channels into a new document that can be called with the `getLatestContent query`
```bash
updateChannel(channelId: String!, [name, content, socials, status]): Channel
latestContent(): [Content]
```

## Future Features
  - getting all the catchers
  - live notifications using Browser Notifications API for Live content
  - content integration with forum
