import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./usermodel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "product",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_link: {
      type: DataTypes.VIRTUAL,
      get() {
        console.log("Image value: ", this.getDataValue("image"));
        return `${process.env.APP_API_BASE}/public/images/product/${this.getDataValue(
          "image"
        )}`;
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Products;