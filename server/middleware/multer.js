import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../public/images/user");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../public/images/product");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

export const uploadImageUser = multer({
  storage: storageUser,
}).single("UserImage");

export const uploadImageProduct = multer({
  storage: storageProduct,
}).single("ProductImage");
