import nodemailer from "nodemailer";

const transPort = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail=.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

export { transPort };
