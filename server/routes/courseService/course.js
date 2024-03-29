const express = require("express");
const router = express.Router();
require("dotenv").config();

const Course = require("../../models/course/course");

router.get("/getAllCourses/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: "202 OK",
      message: "courses fetched successfully",
      result: courses,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Error while getting the course list",
      error: error,
      errorMessage: error.message,
    });
  }
});

router.post("/addCourse/",
    async (req, res) => {
      const productNew = new Course({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      });  
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

router.delete("/deleteCourse/",
    async (req, res) => {
      const name = req.body;

      const courseFromDb = await Course.findOne({
        name: name,
      }).lean();

      try {
        const result = await Course.deleteOne(courseFromDb);
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: product,
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