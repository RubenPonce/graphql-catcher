import {ChannelModel} from "../models/ChannelModel.js";

export const queries = {
    channels: async () => await ChannelModel.find(),
}