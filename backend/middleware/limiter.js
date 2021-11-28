require("dotenv").config();

const rateLimiter = require("express-rate-limit");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465, 
  host: process.env.SMPTPATH,
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
  secure: true,
});
const ApiOverRequested = {
  from: process.env.EMAILSENDER, // sender address
  to: process.env.EMAILRECEIVER, // list of receivers
  subject: "there are two many request beeing sended on your website",
  text: "50 request have been made in one quarter of an hour, it's weird, you will have to check your logs to findout what happend it seem that you are beeing under attack !! Best regards . Webdeveloper ",
  
};
const loginOverRequested = {
  from: process.env.EMAILSENDER, // sender address
  to: process.env.EMAILRECEIVER, // list of receivers
  subject: "there are two many login request beeing sended on your website",
  text: "5 request have been made in one hour, it's weird, you will have to check your logs to findout what happend it seem that you are beeing under attack !! Best regards . Webdeveloper ",
  
};

exports.loginLimiter = new rateLimiter({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Vous avez essayé de vous connecter un trop grand nombre de fois, veuillez attendre 1 heures pour tenter un nouvel essai.",

    onLimitReached: function () {
      transporter.sendMail(loginOverRequested);
    },
});


exports.apiLimiter = rateLimiter({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50,
  message: "too much request, this is weird?! An email was sent to Admin ",

  onLimitReached: function () {
    
    transporter.sendMail(ApiOverRequested);
  },
});
