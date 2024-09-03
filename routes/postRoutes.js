const express = require('express');
const {creatPost, getPosts, getPostById, updatePost, deletePost, likePost, dislikePost} = require('../controllers/postController.js');

const upload = require('../config/multer');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();



//create post
router.post('/', authMiddleware, upload.single('image'), creatPost);

//get post
router.get('/', getPosts);
router.get('/:id', getPostById);

//update post
router.put('/:id', authMiddleware, upload.single('image'), updatePost);

//delete post
router.delete('/:id', authMiddleware, deletePost);

// like a post
router.put('/:id/like', authMiddleware, likePost);

// dislike a post
router.put('/:id/dislike', authMiddleware, dislikePost);


module.exports = router;