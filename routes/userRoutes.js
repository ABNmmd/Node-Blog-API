const express = require('express');
const { getUser, updateUser } = require('../controllers/userController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();