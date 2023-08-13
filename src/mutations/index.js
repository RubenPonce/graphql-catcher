import {ChannelModel} from "../models/ChannelModel.js";

export const mutations = {
    createChannel: async (parent, args, context, info) => {
        const newChannel = new ChannelModel(args.channel);
        return newChannel.save();
    },
    updateChannel: async (parent, args, context, info) => {
        const {input, channelId} = args; // assuming the update data is nested under an 'input' field in the args
        console.log("input", input, "channelId", channelId)
        const filter = {channelId};
        return ChannelModel.findOneAndUpdate(filter, {$set: input}, {
            returnOriginal: false,
        });
    },
    //@TODO add a delete many to remove old content
    latestContent: async (parent, args, context, info) => {
        const filter = {channelId: args.channelId};
        const update = {
            socials: args.socials,
        }
    },

}