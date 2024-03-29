const express = require("express");
const router = express.Router();
require("dotenv").config();

const Products = require("../../models/course/course");

router.get("/view_all", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({
      status: "202 OK",
      message: "Products fetched successfully",
      result: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the products list",
      error: error,
      errorMessage: error.message,
    });
  }
});

module.exports = router;