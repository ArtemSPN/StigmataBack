import mongoose from "mongoose";
import { UserSchema } from "./User.js";

export const CommentSchema = new mongoose.Schema(
    {
        author:{
            type: String,
            required: true,
        },
        authorUrl:{
            type: String,
            required: true,
        },
        text:{
            type: String,
            required: true,
        },
        postId:{
            type: String,
            required: true,
        },
        img:{
            type: String,
        },
        fileArr:{
            type: [String],
        },
    }
);

export default mongoose.model('Comment', CommentSchema)