import { Product } from "../models/Product.model";
import { slugify } from "../utils/slug";

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
		const { id } = req.body;
		const product = await Product.findById(id);

		if (!product)
			return res.status(404).json({ message: "Product not found" });

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const addNewProduct = async (req, res) => {
	try {
		const { name } = req.body;
		const thumbnail = req.file?.path || "";

		if (!thumbnail) {
			return res.status(400).json({ message: "Thumbnail is required" });
		}

		const product = new Product({
			...req.body,
			thumbnail,
			slug: slugify(name),
		});

		await product.save();
		res.status(201).json(product);
	} catch (error) {
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
