const express = require('express');
const { createComment, getComments, updateComment, deleteComment, likeComment, dislikeComment } = require('../controllers/commentController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();



// create comment
router.post('/', authMiddleware, createComment);

// get comment
router.get('/:postId', getComments);

// update comment
router.put('/:id', authMiddleware, updateComment);

// delete comment
router.delete('/:id', authMiddleware, deleteComment);

// like a post
router.put('/:id/like', authMiddleware, likeComment);

// dislike a post
router.put('/:id/dislike', authMiddleware, dislikeComment);

module.exports = router;