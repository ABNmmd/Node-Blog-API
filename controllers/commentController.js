const Post = require("../models/comment");

//creat comment
const creatComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}