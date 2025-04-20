import Cart from "../models/cartmodel.js";
import Products from "../models/productmodel.js";
import { Order, OrderItem } from "../models/ordermodel.js";
import User from "../models/usermodel.js";
import path, { format } from "path";
import pdf from "pdf-creator-node";
import fs from "fs";
import moment from "moment-timezone";
import { type } from "os";

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
    orderStatus = "Unpaid";
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
      total: total,
      isShipped: false
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
        { model: User, attributes: ["name", "phone"] },
      ],
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findAll({
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
        { model: User, attributes: ["name", "phone"] },
      ],
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const setShippingOrderStatus = async (req, res) => {
  const { uuid } = req.params;
  console.log(uuid)
  try {
    const order = await Order.findOne({
      where: { uuid },
    });
    order.isShipped = true;
    await order.save()
    res.status(200).json({msg: "Order Shipped"})
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (req, res) => {
  const { uuid } = req.params;
  try {
    const order = await Order.findOne({
      where: { uuid },
    });
    order.status = "Shipping";
    await order.save()
    res.status(200).json({msg: "Order Shipped"})
  } catch (error) {
    console.error(error);
  }
};

export const deleteCart = async (req, res) => {};

export const createInvoice = async (req, res) => {
  const { uuid } = req.params;
  console.log("orderUuid", uuid);
  try {
    const order = await Order.findOne({
      where: { uuid },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Products,
            },
          ],
        },
        { model: User, attributes: ["name", "phone"] },
      ],
    });
    const data = {
      invoiceId: order.uuid,
      name: order.user.name,
      phone: order.user.phone,
      address: order.address,
      status: order.status,
      createdAt: moment(order.createdAt)
        .tz("Asia/jakarta")
        .format("YYYY-MM-DD"),
      items: order.orderItems.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      total: order.total,
    };
    console.log(data);
    const pathfile = "./public/invoice";
    const filename = `${order.uuid}.pdf`;
    const fullpath = pathfile + "/" + filename;
    const html = fs.readFileSync("./assets/templates/template.html", "utf-8");
    const option = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
    };

    const document = {
      html: html,
      data: data,
      path: fullpath,
      type: "buffer",
    };
    const buffer = await pdf.create(document, option);
    res
      .status(200)
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${order.uuid}.pdf"`,
      })
      .send(buffer);
  } catch (error) {
    console.error(error);
  }
};
