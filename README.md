![what-the-hecking-logo-is-this](https://github.com/RubenPonce/grahql-catcher/assets/43939942/c8defb8a-de5b-4de2-a42d-4170d40f77f9)



A GraphQL NodeJS server for delivering content to the frontend of Catcher. 


## Installation

```bash
npm install
```
```bash
npm start
```
starts on localhost:4000
## Current Features
- delivers RSS content to the frontend through mongodb
- CRUD operations for Catching Channels
- CRUD operations for Content(only stores updated content)
## Usage
The two mutation that do the heavy lifting
- updateChannel gets the channel information from the channel's rss feed and updates the database that uses another serviec I call the pollerexploionservice and stores it in Mongodb
- latestContent gets inserts the latest (recent 30) content from all the channels into a new document that can be called with the `getLatestContent query`
```bash
updateChannel(channelId: String!, [name, content, socials, status]): Channel
latestContent(): [Content]
```

## Future Features
  - getting all the catchers
  - live notifications using Browser Notifications API for Live content
  - content integration with forum
