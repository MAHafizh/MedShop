// models/CartModel.js
import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./usermodel.js"
import Products from "./productmodel.js"

const Cart = db.define("cart", {
  uuid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Users.hasMany(Cart);
Cart.belongsTo(Users);

Products.hasMany(Cart);
Cart.belongsTo(Products);

export default Cart;