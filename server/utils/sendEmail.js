import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInvoiceByEmail = async (toEmail, subject, text, filepath) => {
  const options = {
    from: `MedShop. <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: subject,
    text: text,
    attachments: [{
        filename: "invoice.pdf",
        path: filepath,
    }],
  };
  return transporter.sendMail(options)
};

export default sendInvoiceByEmail