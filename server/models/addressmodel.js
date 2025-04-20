import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./usermodel.js";

const Address = db.define(
  "address",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Address);
Address.belongsTo(User);

export default Address;