import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.js";
dotenv.config();

export default async function verifyToken(req, res, next){
    const token = req.header('Authorization').split(" ")[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied' })
    }
    try {
        const {userId} = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: userId})
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}