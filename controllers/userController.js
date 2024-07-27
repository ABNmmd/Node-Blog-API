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

// update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { username, email, profilePicture, bio } = req.body;
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}