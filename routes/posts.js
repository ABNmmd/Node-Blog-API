const express = require('express');
const router = express.Router();
const {creatPost, getPosts, getPostById, updatePost, deletePost} = require('../controllers/posts.js');



//create post
router.post('/', creatPost);

//get post
router.get('/', getPosts);
router.get('/:id', getPostById);

//update post
router.put('/:id', updatePost);

//delete post
router.delete('/:id', deletePost);


module.exports = router;