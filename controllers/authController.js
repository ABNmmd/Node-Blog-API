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
        res.status(500).json({ message: error.message });
    }
};

//Login
