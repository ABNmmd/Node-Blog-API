const Post = require("../models/post");

// Like a post
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const post = Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(like => like.toString() !== userId);
        } else {
            post.likes.push(userId);
            post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== userId);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {

}