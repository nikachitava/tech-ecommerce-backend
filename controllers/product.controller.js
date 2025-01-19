import { Product } from "../models/Product.model.js";
import { slugify } from "../utils/slug.js";

export const getLatestProducts = async (req, res) => {
	try {
		const products = await Product.find({})
			.sort({ createdAt: -1 })
			.limit(8)
			.select("-__v");

		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({}).select("-__v");
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById({ _id: id });

		if (!product)
			return res.status(404).json({ message: "Product not found" });

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const addNewProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			brand,
			stock,
			sku,
			discountPercent,
			thumbnail,
			subcategory,
			specifications,
			variants,
			tags,
		} = req.body;

		// Validate required fields
		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!brand ||
			!stock ||
			!sku
		) {
			return res.status(400).json({
				message: "Please provide all required fields",
			});
		}

		// const thumbnail = req.file?.path;
		// if (!thumbnail) {
		// 	return res.status(400).json({
		// 		message: "Thumbnail is required",
		// 	});
		// }

		const product = new Product({
			name,
			slug: slugify(name.toLowerCase()),
			description,
			price,
			discountPercent,
			category,
			subcategory,
			brand,
			stock,
			sku,
			thumbnail,
			specifications: specifications || [],
			variants: variants || [],
			tags: tags || [],
			images: [],
			isActive: true,
		});

		const savedProduct = await product.save();
		res.status(201).json({
			success: true,
			data: savedProduct,
		});
	} catch (error) {
		if (error.code === 11000) {
			// Duplicate key error
			return res.status(400).json({
				message: "Product with this slug or SKU already exists",
			});
		}
		res.status(500).json({ message: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product)
			return res.status(404).json({ message: "Product not found" });

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
