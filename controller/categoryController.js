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