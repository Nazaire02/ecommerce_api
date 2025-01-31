import Category from "../models/category.js";
import Product from "../models/product.js";

export async function add(req, res) {
    const userId = req.userId;
    try {
        const {name, price, category, description} = req.body
        const {filename} = req.file
        const newProduct = new Product({
            name,
            price,
            category,
            description,
            stock: 0,
            user: userId,
            image: filename
        })
        await newProduct.save();
        return res.status(201).json({
            isSucces: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error creating product"
        });
    }
}

export async function getAll(req, res) {
    const userId = req.userId;
    try {
        const categories = await Category.find({
            user: userId
        })

        return res.status(200).json({
            isSucces: true,
            categories,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting categories"
        });
    }
}

export async function getOne(req, res){
    try {
        const categoryId = req.params.id;
        const userId = req.userId;
        const category = await Category.findOne({
            _id: categoryId,
            user: userId
        })
        return res.status(200).json({
            isSucces: true,
            category,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting category"
        });
    }
}

export async function update(req, res) {
    try {
        const {categoryId, label} = req.body;
        const category = await Category.findOneAndUpdate(
            {_id: categoryId},
            {label},
            { new: true, runValidators: true } 
        );
        return res.status(200).json({
            isSucces: true,
            category,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error updating category"
        });
    }
}

export async function remove(req, res){
    try {
        const {categoryId} = req.body;
        await Category.deleteOne(
            {_id: categoryId},
        );
        return res.status(200).json({
            isSucces: true,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error deleting category"
        });
    }
}