import Cart from "../models/cartmodel.js";
import Users from "../models/usermodel.js";
import Products from "../models/productmodel.js";

export const postToCart = async (req, res) => {
  const { productUuid } = req.body;
  const quantity = parseInt(req.body.quantity);
  const userUuid = req.session.uuid;
  console.log("req.body", req.body);
  console.log("req.session", req.session.uuid);

  try {
    const product = await Products.findOne({
      where: {
        uuid: productUuid,
      },
    });
    const exist = await Cart.findOne({
      where: {
        userUuid: userUuid,
        productUuid: productUuid,
      },
    });
    const subtotal = product.price * quantity;
    if (exist) {
      exist.quantity = exist.quantity + quantity;
      exist.subtotal = exist.subtotal + subtotal;
      await exist.save();
    } else {
      await Cart.create({
        userUuid: userUuid,
        productUuid: productUuid,
        quantity: quantity,
        subtotal: subtotal,
      });
    }
    res.status(200).json({ msg: "Product Added To Cart" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.error(error);
  }
};

export const updateCart = async (req, res) => {
  const { uuid } = req.body;
  const quantity = parseInt(req.body.quantity);

  try {
    const cart = await Cart.findOne({
      where: { uuid },
      include: [
        {
          model: Products,
          attributes: ["price"],
        },
      ],
    });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.quantity = quantity;
    cart.subtotal = cart.product.price * quantity;
    await cart.save();
    res.status(200).json({ msg: "cart qty updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.error(error);
  }
};

export const getCart = async (req, res) => {
  const userUuid = req.session.uuid;
  try {
    const cart = await Cart.findAll({
      where: { userUuid },
      attributes: ["uuid", "quantity", "subtotal", "productUuid"],
      include: [
        {
          model: Products,
          attributes: ["name", "price", "image_link", "image"],
        },
      ],
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.error(error);
  }
};

export const deleteCart = async (req, res) => {
  const { uuid } = req.body;
  if (!uuid) {
    return res.status(400).json({ msg: "UUID Required" });
  }
  try {
    const cart = await Cart.findOne({
      where: { uuid },
    });
    if (!cart) return res.status(404).json({ msg: "Cart Not Found" });
    await cart.destroy();
    res.status(200).json({ msg: "Cart Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};