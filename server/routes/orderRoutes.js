import express from "express";
import { VerifyUser } from "../middleware/authUser.js";
import { createOrderItem, createOrder, getOrder, getOrderById, getOrderItemById } from "../controller/order.js"
const router = express.Router();

router.post("/checkout", VerifyUser, createOrderItem)
router.get("/checkout", VerifyUser, getOrderItemById)
router.post("/order", VerifyUser, createOrder)
router.get("/order", VerifyUser, getOrder)
router.get("/order/me", VerifyUser, getOrderById)

export default router;

