import Products from "../models/productmodel.js";
import { Url } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getProduct = async (req, res) => {
  try {
    const response = await Products.findAll({
      attributes: [
        "uuid",
        "name",
        "price",
        "category",
        "description",
        "image",
        "image_link",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const response = await Products.findOne({
      attributes: [
        "uuid",
        "name",
        "price",
        "category",
        "description",
        "image",
        "image_link",
      ],
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!response) return res.status(404).json({ msg: "Product Not Found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const postProduct = async (req, res) => {
  const { name, price, category, description } = req.body;
  const image = req.file;
  let ProductImage;
  if (image) {
    ProductImage = image.filename;
  } else {
    ProductImage = "default-image.png";
  }

  console.log("reqbody", req.body);
  console.log("reqfile", req.file);

  try {
    await Products.create({
      name: name,
      price: price,
      category: category,
      description: description,
      image: ProductImage,
    });
    res.status(201).json({ msg: "Product Added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!product) return res.status(404).json({ msg: "Product Not Found" });

  const { name, price, category, description } = req.body;
  const image = req.file;
  let ProductImage;
  if (image) {
    ProductImage = image.filename;
  } else {
    ProductImage = product.image;
  }

  if (image && product.image !== "default-image.png") {
    const imagePath = path.join(
      __dirname,
      "../public/images/product",
      product.image
    );
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        console.log("Image deleted successfully");
      }
    });
  }

  try {
    await Products.update(
      {
        image: ProductImage,
        name: name,
        price: price,
        category: category,
        description: description,
      },
      {
        where: {
          uuid: product.uuid,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!product) return res.status(404).json({ msg: "Product Not Found" });

  try {
    await Products.destroy({
      where: {
        uuid: product.uuid,
      },
    });

    if (product.image !== "default-image.png") {
      const imagePath = path.join(
        __dirname,
        "../public/images/product",
        product.image
      );
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
