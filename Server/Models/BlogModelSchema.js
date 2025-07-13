import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'NewUser', required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const blogSchema = new Schema({

    title: { type: String, required: true },

    banner: { type: String },

    content: { type: Array, default: [] },

    tags: { type: [String], default: [] },

    des: { type: String },

    author: { type: Types.ObjectId, ref: 'NewUser', required: true },

    draft: {
        type: Boolean,
        default: false,
    },

    activity: {
        likes: [{ type: Types.ObjectId, ref: 'NewUser' }], // unique user IDs
        comments: { type: [commentSchema], default: []}
    }

}, { timestamps: true });

export const BlogModel = model('Blog', blogSchema);


