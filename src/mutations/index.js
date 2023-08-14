import {ChannelModel} from "../models/ChannelModel.js";
import {ContentModel} from "../models/ContentModel.js";
import {ContentSchema} from "../schemas/ContentSchema.js";

async function insertUniqueContent(content) {
    try {
        await ContentModel.findOne({url: content.url});
    } catch (e) {
        await ContentModel.create(content);
    }
}

export const mutations = {
    createChannel: async (parent, args, context, info) => {
        const newChannel = new ChannelModel(args.channel);
        return newChannel.save();
    },
    updateChannel: async (parent, args, context, info) => {
        const {input, channelId} = args;
        const filter = {channelId};

        const channel = await ChannelModel.findOne(filter);

        if (channel) {
            let updateData = {...input};

            if (input.content && Array.isArray(input.content)) {
                let updatedContent = channel.content.concat(input.content);
                updatedContent.sort((a, b) => new Date(a.date) - new Date(b.date));
                if (updatedContent.length > 15) {
                    updatedContent = updatedContent.slice(-15);
                }
                updateData.content = updatedContent;
            }

            if (input.socials && Array.isArray(input.socials)) {
                let updatedSocials = input.socials.concat(channel.socials || []);

                updatedSocials = updatedSocials.filter((social, index, self) =>
                    index === self.findIndex((s) => s.id === social.id)
                );

                updateData.socials = updatedSocials;
            }

            return ChannelModel.findOneAndUpdate(filter, {$set: updateData}, {
                returnOriginal: false,
            });
        } else {
            throw new Error(`Channel with ID ${channelId} not found`);
        }
    },
    latestContent: async () => {
        const allChannels = await ChannelModel.find();
        const allContent = allChannels.reduce((acc, channel) => {
            return acc.concat(channel.content);
        }, []);
        const sortedContent = allContent.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(allContent)
        //ContentModel.insertMany(sortedContent, {ordered: false});
        for (let content of sortedContent) {
            await insertUniqueContent(content);
        }
        return sortedContent;

    }
}