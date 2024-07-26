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
        if(!post){
            return res.status(400).json({ message: "Post not found" })
        }

        const comment = await Comment.create({
            postId,
            authorId: userId,
            content,
        });

        res.status(201).json(comment);
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
}

// Get comments
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).populate('authorId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a comment
const updateComment = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}