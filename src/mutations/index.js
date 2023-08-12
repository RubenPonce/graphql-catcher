import {ChannelModel} from "../models/ChannelModel.js";

export const mutations = {
    updateChannel: async (parent, args, context, info) => {
        const filter = {channelId: args.channelId};
        const update = {
            lastLive: new Date(),
            isLive: args.isLive,
            lastUrl: args.vidUrl,
        };
        return await ChannelModel.findOneAndUpdate(filter, update, {
            returnOriginal: false,
        });
    },
}