import Cart from "../models/cartmodel.js";
import Users from "../models/usermodel.js";
import Products from "../models/productmodel.js";
import { Order, OrderItem } from "../models/ordermodel.js";

export const createOrderItem = async (req, res) => {
  const { carts } = req.body;
  console.log(carts);
  console.log(req.session.uuid);
  try {
    for (const cart of carts) {
      await OrderItem.create({
        productUuid: cart.productUuid,
        userUuid: req.session.uuid,
        quantity: cart.quantity,
        subtotal: cart.subtotal,
      });
    }
    await Cart.destroy({
      where: {
        userUuid: req.session.uuid,
      },
    });
    res.status(200).json({ msg: "Order Created" });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};

export const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findAll({
      where: {
        userUuid: req.session.uuid,
        orderUuid: null,
      },
      include: [
        {
          model: Products,
          attributes: ["name", "price", "image", "image_link"],
        },
      ],
    });
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createOrder = async (req, res) => {
  const { address, method, total } = req.body;
  let orderStatus;
  if (method === "Cash On Delivery") {
    orderStatus = "Pending";
  } else if (method === "Credit Or Debit Card") {
    orderStatus = "Paid";
  } else if (method === null) {
    return res.status(400).json({ msg: "payment method required" });
  }

  try {
    const order = await Order.create({
      userUuid: req.session.uuid,
      address: address,
      status: orderStatus,
      total: total
    });

    await OrderItem.update(
      { orderUuid: order.uuid },
      {
        where: {
          userUuid: req.session.uuid,
          orderUuid: null,
        },
      }
    );
    res.status(200).json({ msg: "Order Created", orderUuid: order.uuid });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Products,
            },
          ],
        },
      ],
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userUuid: req.session.uuid },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Products,
            },
          ],
        },
      ],
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCart = async (req, res) => {};

export const deleteCart = async (req, res) => {};

export const createInvoice = async (req, res) => {
  
};

