import express from "express";
import {
	getUserById,
	authUser,
	getUsers,
	signUp,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/user", getUserById);
router.post("/auth", authUser);
router.post("/singup", signUp);

export default router;
