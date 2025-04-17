import express from "express";
import {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  postProduct,
} from "../controller/products.js";
import { uploadImageProduct } from "../middleware/multer.js";

const router = express.Router();

router.get("/products", getProduct);
router.post("/products", uploadImageProduct, postProduct);
router.get("/products/:uuid", getProductById);
router.patch("/products/:uuid", uploadImageProduct, updateProduct);
router.delete("/products/:uuid", deleteProduct);

export default router;
