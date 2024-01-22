import { createTransport } from "nodemailer";

const smtpTransporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_APP_PW,
  },
});

export default smtpTransporter;
