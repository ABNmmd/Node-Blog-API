const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
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
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;