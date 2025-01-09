import { Category } from "../models/Category.model.js";
import { slugify } from "../utils/slug.js";

export const getCategories = async (req, res) => {
	try {
		const response = await Category.find({});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const addCategory = async (req, res) => {
	try {
		const { name, description, subcategories } = req.body;

		const slug = slugify(name);

		const existingCategory = await Category.findOne({ slug });

		if (existingCategory) {
			return res.status(400).json({
				success: false,
				message: "Category with this name already exists",
			});
		}

		let processedSubcategories = [];
		if (subcategories && Array.isArray(subcategories)) {
			processedSubcategories = subcategories.map((sub) => ({
				name: sub.name,
				slug: slugify(sub.name),
				description: sub.description,
			}));
		}

		const category = new Category({
			name,
			slug,
			description,
			image: req.file ? req.file.path : "",
			subcategories: processedSubcategories,
		});

		await category.save();

		res.status(201).json({
			success: true,
			data: category,
			message: "Category created successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteCategory = async (req, res) => {};
