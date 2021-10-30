"use strict";
require('dotenv').config();
const {MAIL_PASS, MAIL_USER} = process.env;

const nodemailer = require("nodemailer");

module.exports = class MailController {
  static sendEmail = async (to, subject, html) => {
    let transporter = nodemailer.createTransport({
      service:"Mail.ru",
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {user: MAIL_USER,pass: MAIL_PASS},
    });
  
    let info = await transporter.sendMail({
      from: MAIL_USER, to, subject, html
    }); 
  
    return info;
  }
}
