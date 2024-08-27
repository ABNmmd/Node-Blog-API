const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

//creat comment
const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const userId = req.session.userId;
        if (!content || !postId) {
            return res.status(400).json({ message: "Content and Post ID are required." });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({ message: "Post not found" })
        }

        const comment = await Comment.create({
            postId,
            authorId: userId,
            content,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get comments
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).populate('authorId', 'username');

        if (!comments) {
            return res.status(404).json({ message: 'No comments found for this post' });
        }

        // console.log('comments: ', comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: error.message });
    }
}

// Update a comment
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        // console.log(updatedComment);
        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found or not authorized" });
        }

        res.status(200).json(updatedComment);
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
        if (!comment) {
            return res.status(404).json({ message: "comment not fond." })
        }

        if (comment.authorId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this comment." });
        }

        await Comment.deleteOne({ _id: id });
        res.status(200).json({ message: "comment deleted successfuly" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Like a comment
const likeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const comment = await Comment.findById(id).populate('authorId', 'username');
        if (!comment) {
            return res.status(404).json({ message: "comment not fond." })
        }

        if (comment.likes.includes(userId)) {
            comment.likes = comment.likes.filter(like => like.toString() !== userId);
        } else {
            comment.likes.push(userId);
            comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Dislike a post
const dislikeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const comment = await Comment.findById(id).populate('authorId', 'username');
        if (!comment) {
            return res.status(404).json({ message: "comment not fond." })
        }

        if (comment.dislikes.includes(userId)) {
            comment.dislikes = comment.dislikes.filter(dislike => dislike.toString() !== userId);
        } else {
            comment.dislikes.push(userId);
            comment.likes = comment.likes.filter(like => like.toString() !== userId);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//exporting
module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment,
}