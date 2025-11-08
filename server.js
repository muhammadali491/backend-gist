const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
// routes import
const galleryRouter = require("./routes/galleryRouter");
const facultyRouter = require("./routes/facultyRouter");
const coursesRouter = require("./routes/coursesRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// uploading file
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/gallery", galleryRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/admin", adminRouter);

const Admin = require("./models/adminModel");

// make new admin
// const seedAdmin = async () => {
//   await Admin.deleteMany({});
//   const admin = new Admin({ username: "admin", password: "1234" });
//   await admin.save();
//   console.log("Admin created");
//   process.exit();
// };

// seedAdmin();

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connecte Via Mongoose");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
