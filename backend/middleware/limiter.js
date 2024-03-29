require("dotenv").config();
const mailer = require("../models/mailer");
const rateLimiter = require("express-rate-limit");

exports.loginLimiter = new rateLimiter({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Vous avez essayé de vous connecter un trop grand nombre de fois, veuillez attendre 1 heures pour tenter un nouvel essai.",

  onLimitReached: () => {
    mailer.transporter.sendMail(mailer.loginOverRequested);
  },
});

exports.apiLimiter = new rateLimiter({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100,
  message: "too much request, this is weird?! An email was sent to Admin ",

  onLimitReached: () => {
    mailer.transporter.sendMail(mailer.apiOverRequested);
  },
});
