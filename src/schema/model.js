import mongoose from "mongoose";
const { Schema } = mongoose;

const ChannelSchema = new Schema({
  channelId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  lastLive: {
    type: String,
    required: false,
  },
  mediaProvider: { type: String, required: true },
});
const Channel = mongoose.model(ChannelSchema);
export default Channel;
