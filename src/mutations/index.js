import {ChannelModel} from "../models/ChannelModel.js";
import {ContentModel} from "../models/ContentModel.js";
import {ContentSchema} from "../schemas/ContentSchema.js";

async function insertUniqueContent(contentToInsert) {
    try {
        console.log("checking if content exists", contentToInsert.url);
        const content = await ContentModel.findOne({url: contentToInsert.url});
        console.log({content});
        if (!content) {
            console.log("inserting content", contentToInsert.url);
            await ContentModel.create(contentToInsert);
        }
    } catch (e) {
        console.log("inserting content", contentToInsert.url);
        await ContentModel.create(contentToInsert);
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
                console.log("updating 'content'")
                updateData.content = updatedContent;
            }

            if (input.socials && Array.isArray(input.socials)) {
                let updatedSocials = input.socials.concat(channel.socials || []);

                updatedSocials = updatedSocials.filter((social, index, self) =>
                    index === self.findIndex((s) => s.id === social.id)
                );
                console.log("updating 'socials'")
                updateData.socials = updatedSocials;
            }

            return ChannelModel.findOneAndUpdate(filter, {$set: updateData}, {
                returnOriginal: false,
            }).catch((error) => {
                console.error('Failed to update channel:', error);
            });
        } else {
            throw new Error(`Channel with ID ${channelId} not found`);
        }
    },
    /**
     * gets the latest content from all channels and inserts it into the database.
     * @returns {Promise<*>}
     */
    latestContent: async () => {
        console.log("getting latest content")
        const allChannels = await ChannelModel.find();
        const allContent = allChannels.reduce((acc, channel) => {
            return acc.concat(channel.content);
        }, []);
        const sortedContent = allContent.sort((a, b) => new Date(b.date) - new Date(a.date));
        for (let content of sortedContent) {
            await insertUniqueContent(content);
        }
        console.log("fetched and inserted content", sortedContent.length, sortedContent[0].date)
        return sortedContent;

    }
}