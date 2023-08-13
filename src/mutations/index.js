import {ChannelModel} from "../models/ChannelModel.js";

export const mutations = {
    updateChannel: async (parent, args, context, info) => {
        const {input, channelId} = args; // assuming the update data is nested under an 'input' field in the args
        console.log("input", input, "channelId", channelId)
        const filter = {channelId};
        const update = {
            name: input.name,
            status: {
                live: {
                    isLive: input.status.live.isLive,
                    title: input.status.live.title,
                    url: input.status.live.url,
                },
                bans: {
                    isBanned: input.status.bans.isBanned,
                    reason: input.status.bans.reason,
                    mediaProviderForBan: input.status.bans.mediaProviderForBan,
                },
            },
            socials: input.socials,
            content: input.content,
        };

        return ChannelModel.findOneAndUpdate(filter, update, {
            returnOriginal: false,
        });
    },
    //@TODO add a delete many to remove old content
    latestContent: async (parent, args, context, info) => {
        const filter = {channelId: args.channelId};
        const update = {
            socials: args.socials,
        }
    }

}