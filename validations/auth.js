import {
    body
} from 'express-validator';

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password length should be longer than 5 chars').isLength({
        min: 5,
    }),
    body('fullName', 'Name length should be longer than 3 chars').isLength({
        min: 3,
    }),
    body('avatarUrl', 'Wrong URL').optional().isURL(),
];