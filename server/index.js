import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize";
import Users from "./models/usermodel.js";
import Products from "./models/productmodel.js";
import Cart from "./models/cartmodel.js";
import { Order, OrderItem } from "./models/ordermodel.js";
// import Address from "./models/addressmodel.js";

dotenv.config();
const app = express();
const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

try {
  await db.authenticate();
  console.log("Database Connected");
  await Users.sync();
  await Order.sync();
  await Products.sync();
  await OrderItem.sync();
  await Cart.sync();
} catch (error) {
  console.error(error);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/images", express.static("public/images"));
app.use("/public/images", express.static("public/images"));
app.use(express.json());
app.use(userRoute);
app.use(productRoute);
app.use(authRoute);
app.use(cartRoute);
app.use(orderRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Running at Port ${process.env.APP_PORT}`);
});
