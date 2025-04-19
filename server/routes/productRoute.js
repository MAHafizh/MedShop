import express from "express";
import {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  postProduct,
} from "../controller/products.js";
import { uploadImageProduct } from "../middleware/multer.js";
import { VerifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/products", getProduct);
router.get("/products/:uuid", getProductById);
router.post("/products", VerifyUser, uploadImageProduct, postProduct);
router.patch("/products/:uuid", VerifyUser, uploadImageProduct, updateProduct);
router.delete("/products/:uuid", VerifyUser, deleteProduct);

export default router;
