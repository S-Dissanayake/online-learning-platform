const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// database connections
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.URL_DB,
    { useNewUrlParser: true },
    { useUnifiedTopology: false }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(JSON.stringify(err));
  });

const registerRoute = require("./routes/userService/register");
const loginRoute = require("./routes/userService/login");
const adminLoginRoute = require("./routes/userService/adminLogin");
const userRoutes = require("./routes/userService/user");
const courseRoutes = require("./routes/courseService/course");
const coursesByStudentRoutes = require("./routes/coursesByStudent/courses");

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/adminLogin", adminLoginRoute);
app.use("/api/user", userRoutes);
app.use("/api/course/", courseRoutes);
app.use("/api/coursesByStudent/", coursesByStudentRoutes);

app.listen(8800, ()=>{
    console.log("Connected to backend !")
})