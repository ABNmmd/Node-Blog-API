const User = require("../models/user");
const bcrypt = require('bcrypt');

//Register
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).json({ message: "username, email and password are required."});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' }, user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Login
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({ message: "email and password are required."});
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.session.userId = user._id;
        res.status(200).json({ message: 'Logged in successfully' });
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

//Logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({ error: err.message })
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    });
}


module.exports = {
    register,
    login,
    logout,
}