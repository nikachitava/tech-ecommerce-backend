import mongoose from "mongoose";

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
			required: true,
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

export const Category = mongoose.model("Category", categorySchema);
