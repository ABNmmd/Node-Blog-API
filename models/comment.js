const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
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

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;