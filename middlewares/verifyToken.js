import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export default function verifyToken(req, res, next){
    const token = req.header('Authorization').split(" ")[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Invalid token' });
    }
}