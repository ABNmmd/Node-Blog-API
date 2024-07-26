const Comment = require("../models/comment");
const Post = require("../models/post");

//creat comment
const creatComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const userId = req.session.userId;
        if(!content || !postId) {
            return res.status(400).json({ message: "Content and Post ID are required." });
        }

        const post = await Post.findById(postId);
        if(!)
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}