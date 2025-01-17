import express from "express";
import {
	getUserById,
	authUser,
	getUsers,
	signUp,
	logoutUser,
	getCurrentUser,
} from "../controllers/users.controller.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/user", getUserById);
router.post("/auth", authUser);
router.post("/singup", signUp);
router.post("/logout", logoutUser);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
