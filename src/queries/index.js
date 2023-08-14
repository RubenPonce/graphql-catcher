import {ChannelModel} from "../models/ChannelModel.js";
import {ContentModel} from "../models/ContentModel.js";

export const queries = {
    channels: async () => await ChannelModel.find(),
    getLatestContent: async (parent, args, context, info) => {

        info.cacheControl.setCacheHint({maxAge: 1800});
        const latestContent = await ContentModel.find().limit(30);
        latestContent.sort((a, b) => new Date(b.date) - new Date(a.date));
        return latestContent;
    },
}