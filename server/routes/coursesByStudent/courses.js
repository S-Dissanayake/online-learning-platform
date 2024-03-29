const express = require("express");
const router = express.Router();
require("dotenv").config();

const CoursesByStudent = require("../../models/coursesByStudent/coursesByStudent");

router.post("/getAll/", async (req, res) => {
  const courseFromDb = await CoursesByStudent.findOne({
    studentName: req.body.userName,
  }).lean();
  
  const courseList = courseFromDb.courseList;

  try {
    const result = await CoursesByStudent.findOne({studentName: req.body.userName});
    res.status(201).json({
      status: "200 OK",
      courseList: courseList,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.error,
      errorMessage: err.message,
      message: "Error while geting  the Course List",
    });
  }
});

router.post("/createCourseList/", async (req, res) => {
      const newCourseByStudent = new CoursesByStudent({
        studentName: req.body.userName,
        courseList: [],
      });  
      try {
        const result = await newCourseByStudent.save();
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: newCourseByStudent,
          message: "Course List created Successfully",
        });
      } catch (err) {
        return res.status(400).json({
          error: err.error,
          errorMessage: err.message,
          message: "Error while creating the Course List",
        });
      }
    }
);

router.put("/updateCourseList/:userName",async (req, res) => {
      const courseFromDb = await CoursesByStudent.findOne({
        studentName: req.params.userName,
      }).lean();
      
      const updatedCourseList = courseFromDb.courseList;
      updatedCourseList.push(req.body)

      const filter = { 
        studentName: req.params.userName,
      }

      const updateDocument = {
        $set: {
            studentName: req.params.userName,
            courseList: updatedCourseList,
        }
      };

      try {
        const result = await CoursesByStudent.updateOne(filter, updateDocument);
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

module.exports = router;