import {Schema} from "mongoose"

export const ContentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    }
})