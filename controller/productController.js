import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Order } from "../models/order.js";

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
        const {name, price, description, stock, category} = req.body;
        let filename;
        const product = await Product.findById(req.params.id)

        if (req.file) {
            const filePath = path.resolve(__dirname, "..", "uploadImg", product.image);
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
            filename =  req.file.filename
        }else{
            filename = product.image
        }
        const productUpdated = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {
                name,
                price,
                description,
                stock,
                category,
                image: filename
            },
            { new: true, runValidators: true } 
        );
        return res.status(200).json({
            isSucces: true,
            productUpdated,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            isSucces: false,
            message: "Error updating product"
        });
    }
}

export async function remove(req, res) {
    try { 
        const hasOrderedYet = await Order.findOne({
            "products.product": req.params.id
        })
        if (hasOrderedYet) {
            return res.status(409).json({
                isSuccess: false,
                message: "This product cannot be deleted because it has already been ordered."
            });
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) { 
            const filePath = path.resolve(__dirname, "..", "uploadImg", product.image);
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
        }

        await Product.deleteOne({ _id: req.params.id });

        return res.status(200).json({
            isSuccess: true,
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "Error deleting product"
        });
    }
}

export async function toggleStatus(req, res) {
    try {
        const productUpdated = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {status: req.body.status},
            {new: true, runValidators: true}
        )

        return res.status(200).json({
            isSuccess: true,
            productUpdated
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "Error changing status product"
        });
    }
}