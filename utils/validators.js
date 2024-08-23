const { body, validationResult } = require('express-validator');

const validateUserProfileUpdate = [
    body('username').optional().isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    // body('profilePicture').optional().isURL().withMessage('Profile picture must be a valid URL'),
    body('bio').optional().isString().isLength({ max: 200 }).withMessage('Bio must be less than 200 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateUserProfileUpdate,
};