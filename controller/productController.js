import Category from "../models/category.js";
import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
        const products = await Product.find({
            user: userId
        })

        return res.status(200).json({
            isSucces: true,
            products,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting products"
        });
    }
}

export async function getOne(req, res){
    try {
        const productId = req.params.id;
        const userId = req.userId;
        const product = await Product.findOne({
            _id: productId,
            user: userId
        })
        return res.status(200).json({
            isSucces: true,
            product,
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error getting product"
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

export async function remove(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) { 
            const filePath = path.resolve(__dirname, "..", "uploadImg", product.image);
            console.log(filePath)
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
        }

        await Product.deleteOne({ _id: req.params.id });

        return res.status(200).json({
            isSuccess: true,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            isSuccess: false,
            message: "Error deleting product"
        });
    }
}