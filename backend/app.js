const express = require("express");
const app = express();
const saucesRoutes = require("./routes/sauce");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const path = require('path');
const helmet = require('helmet')
require('dotenv').config()

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@p6database.0lkz8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !")); 


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
app.use(helmet())
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/sauces", saucesRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;
