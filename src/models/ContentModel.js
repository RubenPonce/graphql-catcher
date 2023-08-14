import {ContentSchema} from "../schemas/ContentSchema.js";
import mongoose from "mongoose";

export const ContentModel = mongoose.model("Content", ContentSchema);