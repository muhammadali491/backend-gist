const express = require("express");

const coursesRouter = express.Router();
const coursesController = require("../controllers/coursesController");

const multer = require("multer");

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// get All items
coursesRouter.get("/", coursesController.getCourses);
// add an item in Courses
coursesRouter.post("/", upload.single("file"), coursesController.addCourses);
// delete an item in Courses

coursesRouter.delete("/:id", coursesController.deleteCourses);
// update an item in Courses
coursesRouter.put(
  "/:id",
  upload.single("image"),
  coursesController.updateCourses
);

// facultyRouter.put(
//   "/:id",
//   upload.single("image"),
//   facultyController.updateFaculty
// );

module.exports = coursesRouter;
