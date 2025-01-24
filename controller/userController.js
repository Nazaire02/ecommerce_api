import User from "../models/user.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function register(req, res){
    const body = req.body;
    try {
        let newUser = new User({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, saltRounds),
            role: body.role
        });
        newUser = await newUser.save();
        return res.status(201).json({
            isSuccess: true,
            newUser
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error registering user', 
            error,
            isSuccess: false
        })
    }
}