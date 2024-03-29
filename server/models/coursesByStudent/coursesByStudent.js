const mongoose = require("mongoose");

const CoursesByStudentSchema = mongoose.Schema(
    {
      studentName: {
        type: "string",
        required: true,
      },
      courseList: {
        type: "Object",
        required: true,
        default: []
      }
   
    },
    { collection: "CoursesByStudent" }
  );
  
  module.exports = mongoose.model("CoursesByStudent", CoursesByStudentSchema);