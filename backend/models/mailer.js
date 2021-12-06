require("dotenv").config();
const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  port: 465,
  host: process.env.SMPTPATH,
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
  secure: true,
});
exports.apiOverRequested = {
  from: process.env.EMAILSENDER, // sender address
  to: process.env.EMAILRECEIVER, // list of receivers
  subject: "there are two many request beeing sended on your website",
  text: "100 request have been made in one quarter of an hour, it's weird, you will have to check your logs to findout what happend it seem that you are beeing under attack !! Best regards . Webdeveloper ",
};
exports.loginOverRequested = {
  from: process.env.EMAILSENDER, // sender address
  to: process.env.EMAILRECEIVER, // list of receivers
  subject: "there are two many login request beeing sended on your website",
  text: "5 request have been made in one hour, it's weird, you will have to check your logs to findout what happend it seem that you are beeing under attack !! Best regards . Webdeveloper ",
};

