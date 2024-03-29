const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/user/register");

router.post("/", async (req, res) => {

  const register = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    userType: "STUDENT",
  });

  try {
    const result = await register.save();
    const webToken = jwt.sign(
      {
        userName: register.userName,
      },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      signup: true,
      status: "200 OK",
      token: webToken,
      result: result,
      user: register,
      message: "User created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while creating the user",
    });
  }
});

module.exports = router;