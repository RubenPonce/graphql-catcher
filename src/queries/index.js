import {ChannelModel} from "../models/ChannelModel.js";
import {ContentModel} from "../models/ContentModel.js";

export const queries = {
    channels: async () => await ChannelModel.find(),
    //@deprecated - use the channels query to get content instead
    getLatestContent: async (parent, args, context, info) => {
        info.cacheControl.setCacheHint({maxAge: 43200});
        const latestContent = await ContentModel.find()
        latestContent.sort((a, b) => new Date(b.date) - new Date(a.date));
        latestContent.splice(35);
        return latestContent;
    },
}