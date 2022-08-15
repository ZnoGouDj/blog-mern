import {
    body
} from 'express-validator';

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password length should be longer than 5 chars').isLength({
        min: 5,
    }),
];

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

export const postCreateValidation = [
    body('title', 'Enter the article title')
    .isLength({
        min: 3,
    })
    .isString(),
    body('text', 'Enter the article text')
    .isLength({
        min: 10,
    })
    .isString(),
    body('tags', 'Wrong tags format (make it array)').optional().isArray(),
    body('imageUrl', 'Wrong image link').optional().isString(),
];