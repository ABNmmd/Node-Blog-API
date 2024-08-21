const User = require("../models/user");

// get user profile
const getUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update user profile
const updateUser = async (req, res) => {
    try {
        const { username, email, profilePicture, bio } = req.body;
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;
        if (bio) user.bio = bio;
        user.updatedAt = Date.now();

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUser,
    updateUser,
    getProfile,
};