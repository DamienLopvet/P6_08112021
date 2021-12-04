//import express
const express = require("express");

//import sanitizer
const mongoSanitize = require("express-mongo-sanitize");

//create an express app
const app = express();

//inport mongoose
const mongoose = require("mongoose");

//give access to files path
const path = require("path");

//import routers
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

//import http header security config
const helmet = require("helmet");

//import environment variables module
require("dotenv").config();

//connection to mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@p6database.0lkz8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//resolve cors issues
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//settings headers security config
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

//parse request into json
app.use(express.json());

//static use of image datas
app.use("/images", express.static(path.join(__dirname, "images")));

//set up router with frontend root
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

//Remove $ or. from request to sendsanitizeddatas to DataBase
app.use(mongoSanitize());

//export app
module.exports = app;
