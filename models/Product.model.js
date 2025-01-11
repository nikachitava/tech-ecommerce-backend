import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
		sku: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		selled: {
			type: Number,
			default: 0,
			min: 0,
		},
		discountPercent: {
			type: Number,
			required: false,
			min: 0,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		subcategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		brand: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		images: [String],
		specifications: [
			{
				name: String,
				value: String,
			},
		],
		variants: [
			{
				name: String,
				sku: String,
				price: Number,
				stock: Number,
				attributes: [
					{
						name: String,
						value: String,
					},
				],
			},
		],
		tags: [String],
		isActive: {
			type: Boolean,
			default: true,
		},
		ratings: {
			average: {
				type: Number,
				default: 0,
			},
			count: {
				type: Number,
				default: 0,
			},
		},
	},
	{
		timestamps: true,
	}
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, subcategory: 1 });

export const Product = mongoose.model("Product", productSchema);
