import exress from "express";
import {
	addNewProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getLatestProducts,
	getProductsById,
} from "../controllers/product.controller.js";

const router = exress.Router();

router.get("/", getProducts);
router.get("/newestproducts", getLatestProducts);
router.get("/:id", getProductById);
router.post("/", addNewProduct);
router.delete("/:id", deleteProduct);
router.post("/getproducts", getProductsById);

export default router;
