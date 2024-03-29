const express = require("express");
const router = express.Router();
require("dotenv").config();

const Course = require("../../models/course/course");

router.get("/getAllCoursesList/", async (req, res) => {
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
      const newCourse = new Course({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      });  
      try {
        const result = await newCourse.save();
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: newCourse,
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

router.put("/updateCourse/:name",
    async (req, res) => {
      const filter = { 
        name: req.params.name,
      }

      const updateDocument = {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
        }
      };

      try {
        const result = await Course.updateOne(filter, updateDocument);
        res.status(201).json({
          status: "200 OK",
          message: "Course Updated Successfully",
        });
      } catch (err) {
        return res.status(400).json({
          error: err.error,
          errorMessage: err.message,
          message: "Error while Updating the course",
        });
      }
    }
);

router.delete("/deleteCourse/:name",
    async (req, res) => {
      const courseFromDb = await Course.findOne({
        name: req.params.name,
      }).lean();

      try {
        const result = await Course.deleteOne(courseFromDb);
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: courseFromDb,
          message: "Course Deleted Successfully",
        });
      } catch (err) {
        return res.status(400).json({
          error: err.error,
          errorMessage: err.message,
          message: "Error while deleting the course",
        });
      }
    }
);


module.exports = router;