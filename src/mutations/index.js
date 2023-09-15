import {ChannelModel} from "../models/ChannelModel.js";
import {ContentModel} from "../models/ContentModel.js";

async function insertUniqueContent(contentToInsert) {
    try {
        console.log("checking if content exists", contentToInsert.url);
        const content = await ContentModel.exists({url: contentToInsert.url});
        console.log("content", content)
        if (!content) {
            console.log("content is unique", contentToInsert.url);
            delete contentToInsert._id;
            await ContentModel.create(contentToInsert);
        } else {
            console.log("content already exists", contentToInsert.url);
        }
    } catch (e) {
        console.error("error checking or inserting content", contentToInsert.url, e);
    }
}


export const mutations = {
    createChannel: async (parent, args, context, info) => {
        const newChannel = new ChannelModel(args.channel);
        return newChannel.save();
    },

    updateChannel: async (parent, args, context, info) => {
        const {input, channelId} = args;
        console.log("updateChannel", {input, channelId})
        if (!input || !channelId) {
            throw new Error("property input or channelId missing");
        }
        const filter = {channelId};

        const channel = await ChannelModel.findOne(filter);

        if (channel) {
            let updateData = {...input};
            // only update content that is unique, and only keep the latest 15 items.
            if (input.content && Array.isArray(input.content)) {
                let updatedContent = channel.content.concat(input.content);

                updatedContent = updatedContent.filter((content, index, self) =>
                    index === self.findIndex((c) => c.url === content.url)
                );

                updatedContent.sort((a, b) => new Date(b.date) - new Date(a.date));
                if (updatedContent.length > 15) {
                    updatedContent = updatedContent.slice(0, 15);
                }

                console.log("updating 'content'");
                updateData.timeOfLastUpdate = updatedContent[0].date;
                updateData.content = updatedContent;
            }

            if (input.socials && Array.isArray(input.socials)) {
                let updatedSocials = input.socials.concat(channel.socials || []);

                updatedSocials = updatedSocials.filter((social, index, self) =>
                    index === self.findIndex((s) => s.id === social.id)
                );
                console.log("updating 'socials'");
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
    }
    ,
    /**
     * gets the latest content from all channels and inserts it into the database.
     * @returns {Promise<*>}
     * @deprecated
     */
    latestContent: async () => {

        const allChannels = await ChannelModel.find();
        const allContent = allChannels.reduce((acc, channel) => {
            return acc.concat(channel.content);
        }, []);

        const existingUrls = await ContentModel.find().distinct('url');

        const uniqueContent = allContent.filter(content => !existingUrls.includes(content.url));

        const sortedContent = uniqueContent.sort((a, b) => new Date(b.date) - new Date(a.date));

        await ContentModel.insertMany(sortedContent);
        console.log("fetched and inserted content", sortedContent.length, "items with latest date of:", sortedContent[0].date);
        return sortedContent;
    },
    deleteSocial: async (parent, args, context, info) => {
        const {channelId, socialId} = args;
        await ChannelModel.updateOne(
            {channelId: channelId},
            {$pull: {socials: {channelId: socialId}, $set: {content: []}}}
        );
        return true;
    },
}