const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
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
            imageUrl:{
                type: String,
                default: '',
                required: false,
            },
            imagePublicId:{
                type: String,
                default: '',
                required: false,
            },
        },
        bio: {
            type: String,
            default: '',
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