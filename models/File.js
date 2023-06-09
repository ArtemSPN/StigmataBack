import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
    {
        fileUrl:{
            type: String,
            required: true,
        },
        fileName:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('File', FileSchema)