import Users from "../models/usermodel.js";
import argon2, { hash } from "argon2";
import { Url } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "image",
        "image_link",
        "phone",
        "address"
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "image",
        "image_link",
        "phone",
        "address"
      ],
      where: {
        uuid: req.params.uuid,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const postUser = async (req, res) => {
  const { name, email, password, confPassword, role, phone, birthdate } =
    req.body;

  const image = req.file;
  let UserImage;
  if (image) {
    UserImage = image.filename;
  } else {
    UserImage = "default-image.jpg";
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  const existingUser = await Users.findOne({
    where: { email: email },
  });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already registered" });
  }

  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      image: UserImage,
      date_of_birth: birthdate,
      phone: phone,
    });
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  const {
    name,
    email,
    currPassword,
    newPassword,
    confPassword,
    birthdate,
    phone,
    address
  } = req.body;

  const image = req.file;
  let UserImage;
  if (image) {
    UserImage = image.filename;
  } else {
    UserImage = user.image;
  }

  if (image && user.image !== "default-image.jpg") {
    const imagePath = path.join(
      __dirname,
      "../public/images/user",
      user.image
    );
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        console.log("Image deleted successfully");
      }
    });
  }

  if (newPassword || confPassword) {
    if (!currPassword)
      return res.status(400).json({ msg: "Current password is required" });
    const match = await argon2.verify(user.password, currPassword);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    if (newPassword !== confPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
  }

  let password = user.password;
  if (newPassword) {
    password = await argon2.hash(newPassword);
  }

  try {
    await Users.update(
      {
        image: UserImage,
        name: name,
        email: email,
        password: password,
        date_of_birth: birthdate,
        phone: phone,
        address: address
      },
      {
        where: {
          uuid: user.uuid,
        },
      }
    );
    res.status(200).json({ msg: "User berhasil diubah" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  try {
    await Users.destroy({
      where: {
        uuid: user.uuid,
      },
    });
    if (user.image !== "default-image.jpg") {
      const imagePath = path.join(
        __dirname,
        "../public/images/user",
        user.image
      );
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }
    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
