const express = require("express");

//create router
const router = express.Router();

//import user controller
const userCtrl = require("../controllers/user");

//import strong password checker
const password = require("../middleware/password");

//import request limiter
const limiter = require("../middleware/limiter")

//set up module each route need to pass through
router.post("/signup", password, userCtrl.signup);
router.post("/login", limiter.loginLimiter, userCtrl.login);

module.exports = router;
