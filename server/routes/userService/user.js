const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../../models/user/register");

router.get("/view_all", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "202 OK",
      message: "Users fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the user list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.get("/view_one", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.email,
    }).lean();

    res.status(200).json({
      status: "202 OK",
      message: "User fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the user list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.post("/update-profile", async (req, res) => {
  const { updatedPhoneNumber } = req.body;

  const user = await User.findOne({
    email: req.body.email,
  }).lean();

  if (!user) {
    return res.status(404).json({
      status: "error",
      error: error,
      errorMessage: error.message,
      message: "user not found",
    });
  }

  try {
    const response = await User.updateOne(
      { _id: user._id },
      {
        $set: { phoneNumber: updatedPhoneNumber },
      }
    );

    res.status(202).json({
      status: "202 OK",
      message: "User updated successfully",
      result: response,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "User Updating Error",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;