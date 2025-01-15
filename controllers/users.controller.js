import { User } from "../models/Users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById({ id: id });
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const signUp = async (req, res) => {
	try {
		const { name, lastname, email, password } = req.body;

		const checkUser = await User.findOne({ email: email.toLowerCase() });

		if (checkUser) {
			return res.status(400).json({
				success: false,
				message: "User with this email already exists",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			lastname,
			email: email.toLowerCase(),
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({
			success: true,
			message: "User registered successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide both email and password",
			});
		}

		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		res.cookie("authToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Use secure in production
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		});

		res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				lastname: user.lastname,
			},
		});
	} catch (error) {
		console.error("Error in authUser:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const logoutUser = async (req, res) => {
	res.cookie("authToken", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		expires: new Date(0),
	});

	res.status(200).json({
		success: true,
		message: "Logged out successfully",
	});
};

export const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
