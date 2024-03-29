const express = require("express");
const router = express.Router();
require("dotenv").config();

const Products = require("../../models/course/course");

router.post("/",
    async (req, res) => {
      const productNew = new Products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      });

      console.log(" productNew - ", productNew);
  
      try {
        const result = await productNew.save();
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: productNew,
          message: "Course created Successfully",
        });
      } catch (err) {
        return res.status(400).json({
          error: err.error,
          errorMessage: err.message,
          message: "Error while creating the user",
        });
      }
    }
);
module.exports = router;