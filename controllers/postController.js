const Post = require("../models/post");
const cloudinary = require('../config/cloudinary');

//Creat post
const creatPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const authorId = req.session.userId;

        let image;
        if (req.file) {
            image.imageUrl = req.file.path;
            image.imagePublicId = req.file.filename;
        }

        // console.log({ title, content, tags, authorId });
        if (!title || !content || !authorId || !image.imageUrl || !image.imagePublicId) {
            return res.status(400).json({ message: "Title, content, tags, authorId and image are required." });
        }

        const post = await Post.create({ authorId, title, content, image, tags });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('authorId', 'username').select("-content -likes -dislikes");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get post by the id
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('authorId', 'username');
        // console.log('post : ', post);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



//uppdate api
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const Updatedpost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!Updatedpost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(Updatedpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//delete post api
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const Deletedpost = await Post.findByIdAndDelete(id);
        if (!Deletedpost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: "post deleted successfuly" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Like a post
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;

        const post = await Post.findById(id).populate('authorId', 'username');
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

        const post = await Post.findById(id).populate('authorId', 'username');
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
    creatPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
}