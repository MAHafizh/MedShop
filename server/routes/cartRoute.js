import express from "express";
import { postToCart, getCart, updateCart, deleteCart } from "../controller/cart.js";
import { VerifyUser } from "../middleware/authUser.js";
const router = express.Router();

router.post("/cart", VerifyUser, postToCart);
router.get("/cart", VerifyUser, getCart);
router.patch("/cart", VerifyUser, updateCart);
router.delete("/cart", VerifyUser, deleteCart);

export default router;