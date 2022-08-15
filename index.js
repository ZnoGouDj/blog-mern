import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {
    registerValidation,
    loginValidation
} from './validations.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

dotenv.config();

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log('DB ok'))
    .catch(err => console.log('DB error', err));

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});