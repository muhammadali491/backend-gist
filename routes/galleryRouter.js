const express = require("express");
const multer = require("multer");

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const galleryRouter = express.Router();
const galleryController = require("../controllers/galleryController");
// get All items
galleryRouter.get("/", galleryController.getGallery);

// add an item in gallery

galleryRouter.post("/", upload.single("file"), galleryController.addGallery);
// delete an item in gallery
galleryRouter.delete("/:id", galleryController.deleteGallery);
// update an item in gallery
galleryRouter.put(
  "/:id",
  upload.single("image"),
  galleryController.updateGallery
);

module.exports = galleryRouter;
