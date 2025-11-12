const express = require("express");

const galleryRouter = express.Router();
const { parser } = require("./cloudinaryConfig");

const galleryController = require("../controllers/galleryController");
// get All items
galleryRouter.get("/", galleryController.getGallery);

// add an item in gallery

galleryRouter.post("/", parser.single("file"), galleryController.addGallery);
// delete an item in gallery
galleryRouter.delete("/:id", galleryController.deleteGallery);
// update an item in gallery
galleryRouter.put(
  "/:id",
  parser.single("image"),
  galleryController.updateGallery
);

module.exports = galleryRouter;
