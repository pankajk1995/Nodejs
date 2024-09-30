const express = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const otpGenerator = require("otp-generator");


const { userregistercontroller, verificationcontroller, logincontroller } = require("../controller/user.controller");




// Welcome Route
UserRouter.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

// Register Route
UserRouter.post("/register",userregistercontroller);
UserRouter.post("/verification",verificationcontroller);
UserRouter.post("/login",logincontroller);





module.exports = UserRouter;
