import express from 'express'
import { register } from '../controller/userController.js';
const userRoutes = express.Router();

userRoutes.post('/register', register);

export default userRoutes;
