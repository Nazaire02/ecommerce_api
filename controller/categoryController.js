const Category = require("../models/category.js")

async function add(req, res) {
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

async function getAll(req, res) {
    try {
        const categories = await Category.find()

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

async function getAllByUser(req, res) {
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

async function getOne(req, res){
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

async function update(req, res) {
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


async function remove(req, res){
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

module.exports = {
    add,
    getAll,
    getAllByUser,
    getOne,
    update,
    remove
}