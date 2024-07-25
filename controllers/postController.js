const Post = require("../models/post");

//Creat post
const creatPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "Title, content, and author are required." });
        }

        const post = await Post.create({ title, content, author });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
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


module.exports = {
    creatPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
}