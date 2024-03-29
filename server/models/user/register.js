const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    email: {
      required: true,
      type: "string",
    },
    userType: {
      type: "string",
      required: true,
      default: "STUDENT",
    }
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", registerSchema);