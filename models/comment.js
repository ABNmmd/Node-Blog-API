const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
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
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;