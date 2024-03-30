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

router.put("/update_student", async (req, res) => {
  const { id, name, email, password } = req.body;

  const user = await User.findOne({
    _id: id,
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
      { _id: id },
      {
        $set: { 
          name: name,
          email: email,
          password: password
        },
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

router.get("/get_all_students", async (req, res) => {
  try {
    const user = await User.find({
      userType: "STUDENT",
    });

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

router.delete("/deleteStudent/:id",
    async (req, res) => {
      const studentFromDb = await User.findOne({
        _id: req.params.id,
        userType: "STUDENT"
      }).lean();

      try {
        const result = await User.deleteOne(studentFromDb);
        res.status(201).json({
          status: "200 OK",
          result: result,
          user: studentFromDb,
          message: "User Deleted Successfully",
        });
      } catch (err) {
        return res.status(400).json({
          error: err.error,
          errorMessage: err.message,
          message: "Error while deleting the User",
        });
      }
    }
);

module.exports = router;