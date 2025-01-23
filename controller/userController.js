import User from "../models/user.js";

export async function register(req, res){
    const body = req.body;
    try {
        let newUser = new User({
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role
        });
        newUser = await newUser.save();
        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error registering user', error })
    }
}