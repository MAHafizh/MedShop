import Users from "../models/usermodel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const { password, remember } = req.body;
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });
  req.session.uuid = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const phone = user.phone;
  const birthdate = user.date_of_birth;
  const image = user.image;
  const image_link = user.image_link;
  if (remember === "on") {
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
  } else {
    req.session.cookie.expires = false;
  }
  req.session.save(() => {
    res
      .status(200)
      .json({ uuid, name, email, phone, birthdate, image, image_link });
  });
};

export const Me = async (req, res) => {
  if (!req.session.uuid) {
    return res.status(401).json({ msg: "Mohon login kembali" });
  }
  const user = await Users.findOne({
    attributes: [
      "uuid",
      "name",
      "email",
      "role",
      "image",
      "image_link",
      "phone",
      "date_of_birth",
    ],
    where: {
      uuid: req.session.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.clearCookie("connect.sid")
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
