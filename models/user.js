const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            required: false,
        },
        bio: {
            type: String,
            required: false,
        },
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

const User = mongoose.model("user", UserSchema);

module.exports = User;