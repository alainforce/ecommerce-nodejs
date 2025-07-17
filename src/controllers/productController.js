import Product from "../models/productModel.js";



export const createProduct = async (req, res) => {
    try {
        const { name , description ,price ,salePrice ,images ,category ,
            featured,rating ,reviewCount,colors ,sizes ,stock } = req.body;
            
        const product = await Product.create({
            name , description ,price ,salePrice ,images ,category ,
            featured,rating ,reviewCount, colors ,sizes ,stock , });
            
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort();
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, description, category, images, price } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            category,
            images,
            price,
        }, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}