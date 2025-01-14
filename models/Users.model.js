import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	shippingAddresses: [
		{
			street: String,
			city: String,
			state: String,
			country: String,
			zipCode: String,
			isDefault: {
				type: Boolean,
				default: false,
			},
		},
	],
});

export const User = mongoose.model("User", userSchema);
