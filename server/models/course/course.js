
const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    price: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    imageUrl: {
      type: "string",
      required: false,
    }
  },
  { collection: "Course" }
);

module.exports = mongoose.model("Course", CourseSchema);
