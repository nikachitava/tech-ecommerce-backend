import express from "express";
import {
	addCategory,
	deleteCategory,
	getCategories,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/", deleteCategory);

export default router;
