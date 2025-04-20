import express from "express";
import { VerifyUser } from "../middleware/authUser.js";
import {
  createOrderItem,
  createOrder,
  getOrder,
  getOrderById,
  getOrderItemById,
  createInvoice,
  setShippingOrderStatus,
} from "../controller/order.js";
const router = express.Router();

router.post("/checkout", VerifyUser, createOrderItem);
router.get("/checkout", VerifyUser, getOrderItemById);
router.post("/order", VerifyUser, createOrder);
router.get("/order", VerifyUser, getOrder);
router.patch("/order/:uuid", VerifyUser, setShippingOrderStatus);
router.get("/order/me", VerifyUser, getOrderById);
router.get("/order/invoice/:uuid", VerifyUser, createInvoice);

export default router;
