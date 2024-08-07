const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;