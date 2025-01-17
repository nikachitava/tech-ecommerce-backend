import jwt from "jsonwebtoken";
import { User } from "../models/Users.model.js";

export const protect = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "No token, authorization denied",
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.userId).select("-password");
		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: "Token is not valid",
		});
	}
};

export const authenticateToken = async (req, res, next) => {
	const token = req.cookies.authToken;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Authentication required",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;

		req.user = await User.findById(decoded.userId).select("-password");
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token",
		});
	}
};
