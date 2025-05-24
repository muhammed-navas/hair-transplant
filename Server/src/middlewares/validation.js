import { body, validationResult } from 'express-validator';
import CustomError from '../utils/customError.js';


export const signupValidator = [
    body('firstName')
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('lastName')
        .isLength({ min: 1 })
        .withMessage('Last name is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
  
];


export const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
};