import { Router } from "express";
import { createProduct, deleteProducts, getProductId, getProduct } from "../../controllers/product.controllers.js";

const router = Router();
router.post("/", createProduct);
router.get("/:id", getProductId)
router.get("/", getProduct)
router.delete("/:id", deleteProducts)



export default router;