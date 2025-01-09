import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	description: String,
	isActive: {
		type: Boolean,
		default: true,
	},
});

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		description: String,
		image: {
			type: String,
			required: false,
		},
		subcategories: [subcategorySchema],
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Category = mongoose.model("Category", categorySchema);
