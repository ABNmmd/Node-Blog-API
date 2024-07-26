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
        res.status(500).json({ error: error.message });
    }
}

// Get comments
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find(postId).populate('authorId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a comment
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { newContent } = req.body;
        const userId = req.session.userId;

        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({ message: "comment not fond." })
        }

        if(comment.authorId.toString() !== userId){
            return res.status(403).json({ message: "You are not authorized to update this comment." });
        }

        const updatedComment = await Comment.updateOne(comment, { content: newContent});
        if(!updatedComment){
            return res.status(404).json({ message: "comment not apdated." })
        }
        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete a comment
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({ message: "comment not fond." })
        }

        if(comment.authorId.toString() !== userId){
            return res.status(403).json({ message: "You are not authorized to delete this comment." });
        }

        const deletedComment = await Comment.deleteOne(comment);
        if(!deletedComment){
            return res.status(404).json({ message: "comment not deleted." })
        }
        res.status(200).json({ message: "comment deleted successfuly" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//exporting
module.exports = {
    creatComment,
    getComments,
    updateComment,
    deleteComment,
}