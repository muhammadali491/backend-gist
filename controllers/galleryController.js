const Gallery = require("../models/galleryModel");

// get all items from Gallery
exports.getGallery = async (req, res, next) => {
  const myGallery = await Gallery.find();
  myGallery.map((image) => {
    image.src = image.src.replace("/upload/", `/upload/w_400,q_auto,f_auto/`);
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
    const gallery = new Gallery({
      label: req.body.label,
      desc: req.body.desc,
      src: req.file ? req.file.path : null, // <-- file name stored
    });

    const newItem = await gallery.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
  const itemId = req.params.id;
  const updatedData = {
    label: req.body.label,
    desc: req.body.desc,
    // src: req.body.src,
  };
  if (req.file) {
    updatedData.src = req.file.path;
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
