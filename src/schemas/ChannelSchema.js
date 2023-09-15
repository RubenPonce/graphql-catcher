import {Schema} from "mongoose";
export const ChannelSchema = new Schema({
    channelId: {
        type: String,
        required: true,
    },
    timeOfLastUpdate: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    status: {
        live: {
            isLive: {type: Boolean, default: false},
            title: {type: String, default: ""},
            url: {type: String, default: ""},
        },
        bans: {
            isBanned: {type: Boolean, default: false},
            reason: {type: String, default: ""},
            mediaProviderForBan: {type: String, default: ""},
        },
    },
    socials: [{
        name: {type: String, required: true},
        url: {type: String, required: true},
        channelId: {type: String, required: false},
    }],
    content: [{
        title: {type: String, required: true},
        url: {type: String, required: true},
        image: {type: String, required: false},
        date: {type: String, required: true},
    }],
});