const express = require('express');
const {creatPost, getPosts, getPostById, updatePost, deletePost} = require('../controllers/postController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();



//create post
router.post('/', authMiddleware, creatPost);

//get post
router.get('/', getPosts);
router.get('/:id', getPostById);

//update post
router.put('/:id', authMiddleware, updatePost);

//delete post
router.delete('/:id', authMiddleware, deletePost);


module.exports = router;