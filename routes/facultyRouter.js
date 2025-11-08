const express = require("express");

const facultyRouter = express.Router();
const facultyController = require("../controllers/facultyController");

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
facultyRouter.get("/", facultyController.getFaculty);
// add an item in Faculty
// facultyRouter.post("/", facultyController.addFaculty);
facultyRouter.post(
  "/",
  upload.single("file"), // MATCH THIS NAME WITH FRONTEND
  facultyController.addFaculty
);
// delete an item in Faculty
facultyRouter.delete("/:id", facultyController.deleteFaculty);

// update an item in Faculty

facultyRouter.put(
  "/:id",
  upload.single("image"),
  facultyController.updateFaculty
);

module.exports = facultyRouter;
