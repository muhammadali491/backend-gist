const express = require("express");

const facultyRouter = express.Router();
const facultyController = require("../controllers/facultyController");
const { parser } = require("./cloudinaryConfig");

// get All items
facultyRouter.get("/", facultyController.getFaculty);
// add an item in Faculty
facultyRouter.post(
  "/",
  parser.single("file"), // MATCH THIS NAME WITH FRONTEND
  facultyController.addFaculty
);
// delete an item in Faculty
facultyRouter.delete("/:id", facultyController.deleteFaculty);

// update an item in Faculty

facultyRouter.put(
  "/:id",
  parser.single("image"),
  facultyController.updateFaculty
);

module.exports = facultyRouter;
