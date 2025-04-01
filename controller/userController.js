const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Cart = require("../models/cart.js");

dotenv.config();

async function register(req, res) {
    try {
        const saltRounds = 10;
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ email })
        
        if (user) {
            return res.status(409).json({
                message: "Email already exists"
            })
        }

        let newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, saltRounds),
            role
        });
        newUser = await newUser.save();

        if (newUser?.role === "user") {
            //Here we initialize the user's basket
            const userCart = new Cart({
                userId: newUser._id
            })
            await userCart.save();
        }
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

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                message: "Indentifiants incorrects"
            })
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({
                message: "Indentifiants incorrects"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
            expiresIn: '1h',
        });
        return res.status(200).json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message:"Une erreur s'est produite",
            error
        })
    }
}

async function getAll(req, res){
    const userId = req.userId;
    try {
        const isAdmin = await  User.findOne({
            _id: userId,
            role:"admin"
        });

        if (!isAdmin) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }

        const users = await User.find();
        res.status(200).json({
            users: users,
            message: "Liste de tous les users"
        })
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            message:"Une erreur s'est produite",
            error
        }) 
    }
}

module.exports = {
    register,
    login,
    getAll
}