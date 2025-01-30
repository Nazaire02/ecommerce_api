import express from 'express'
import { getAll, login, register } from '../controller/userController.js';
import verifyToken from '../middlewares/verifyToken.js';
const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/get-all',verifyToken, getAll);

export default userRoutes;
