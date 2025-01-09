import exress from "express";
import {
	addNewProduct,
	deleteProduct,
	getProductById,
	getProducts,
} from "../controllers/product.controller.js";

const router = exress.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addNewProduct);
router.delete("/", deleteProduct);

export default router;
