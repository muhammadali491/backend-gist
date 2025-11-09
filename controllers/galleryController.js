const Gallery = require("../models/galleryModel");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// get all items from Gallery
exports.getGallery = async (req, res, next) => {
  const myGallery = await Gallery.find();
  myGallery.map((image) => {
    image.src = `${BASE_URL}/uploads/${image.src}`;
  });
  res.status(200).json({
    status: "success",
    results: myGallery.length,
    data: {
      gallery: myGallery,
    },
  });
};
// add an item in Gallery
exports.addGallery = async (req, res) => {
  try {
    console.log("adding into gallery");
    const gallery = new Gallery({
      label: req.body.label,
      desc: req.body.desc,
      src: req.file ? req.file.filename : null, // <-- file name stored
    });

    const newItem = await gallery.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.addGallery = async (req, res, next) => {
//   const gallery = new Gallery({
//     label: req.body.label,
//     desc: req.body.desc,
//     src: req.body.src,
//   });
//   const newItem = await gallery.save();
//   res.status(201).json(newItem);
// };
// delete an item from Gallery
exports.deleteGallery = async (req, res, next) => {
  const itemId = req.params.id;
  const deletedItem = await Gallery.findByIdAndDelete(itemId);
  if (!deletedItem) {
    return res.status(404).json({
      status: "fail",
      message: "Item not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
// update galleryItem
exports.updateGallery = async (req, res, next) => {
  // console.log("BACKEND HIT: Gallery UPDATE FACULTY");
  // console.log("PARAMS:", req.params);
  // console.log("BODY:", req.body);
  // console.log("FILE:", req.file);
  // console.log("Starting Course update");

  const itemId = req.params.id;
  const updatedData = {
    label: req.body.label,
    desc: req.body.desc,
    // src: req.body.src,
  };
  if (req.file) {
    // console.log("we got an image", req.file);
    updatedData.src = req.file.filename;
  }
  const updatedItem = await Gallery.findByIdAndUpdate(itemId, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!updatedItem) {
    return res.status(404).json({
      status: "fail",
      message: "Item not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      gallery: updatedItem,
    },
  });
};
