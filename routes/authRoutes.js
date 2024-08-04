const express = require('express');

const { register, login, logout, checkAuthStatus } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// auth status check route
router.get('/status', checkAuthStatus);

module.exports = router;