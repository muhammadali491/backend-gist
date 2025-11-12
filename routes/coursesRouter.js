const express = require("express");

const coursesRouter = express.Router();
const coursesController = require("../controllers/coursesController");
const { parser } = require("./cloudinaryConfig");

// get All items
coursesRouter.get("/", coursesController.getCourses);
// add an item in Courses
coursesRouter.post("/", parser.single("file"), coursesController.addCourses);
// delete an item in Courses

coursesRouter.delete("/:id", coursesController.deleteCourses);
// update an item in Courses
coursesRouter.put(
  "/:id",
  parser.single("image"),
  coursesController.updateCourses
);

module.exports = coursesRouter;
