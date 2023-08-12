import mongoose from "mongoose";
import {ChannelSchema} from "../schemas/ChannelSchema.js";
export const ChannelModel = mongoose.model("Channel", ChannelSchema);