const User = require("../models/user");

// get user profile
const getUser = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById({ userId }).select("-password");
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}