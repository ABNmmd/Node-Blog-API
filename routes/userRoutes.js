const express = require('express');
const { getUser, updateUser, getProfile } = require('../controllers/userController.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const { validateUserProfileUpdate } = require('../utils/validators');

const router = express.Router();


// get user
router.get('/', authMiddleware, getUser);

// get user
router.get('/:userId', getProfile);

// update user
router.put('/', authMiddleware, validateUserProfileUpdate, updateUser);


module.exports= router;