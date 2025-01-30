import Category from "../models/category.js";

export async function add(req, res) {
    const userId = req.userId;
    try {
        const {label} = req.body;
        const newCategory = new Category({
            label: label,
            user: userId
        })
        await newCategory.save();
        return res.status(201).json({
            isSucces: true,
            message: "La catégorie a été enregistrée avec succès"
        });
    } catch (error) {
        return res.status(500).json({
            isSucces: false,
            message: "Error creating category"
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