import { Schema } from "mongoose";

export const ChannelSchema = new Schema({
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
    socials: [{
        mediaProvider: { type: String, required: true },
    }],
});