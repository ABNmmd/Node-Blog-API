const Post = require("../models/post");

// Like a post
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(like => like.toString() !== userId);
        } else {
            post.likes.push(userId);
            post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Dislike a post
const dislikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.dislikes.includes(userId)) {
            post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId);
        } else {
            post.dislikes.push(userId);
            post.likes = post.likes.filter(like => like.toString() !== userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    likePost,
    dislikePost,
}