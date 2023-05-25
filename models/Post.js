import mongoose from "mongoose";
import { UserSchema } from "./User.js";
import { CommentSchema } from "./Comment.js";

export const PostSchema = new mongoose.Schema(
    {
        author:{
            type: String,
            required: true,
        },
        authorUrl:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        section:{
            type: String,
            required: true,
        },
        text:{
            type: String,
            required: true,
        },
        imgArr:{
            type: [String],
        },
        viewCount:{
            type: Number,
            default: 0,
        },
        fileArr:{
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Post', PostSchema)