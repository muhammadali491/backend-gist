const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
