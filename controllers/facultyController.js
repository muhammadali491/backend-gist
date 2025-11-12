const Faculty = require("../models/facultyModel");
// get all items from Faculty
exports.getFaculty = async (req, res, next) => {
  const facultyList = await Faculty.find();
  // let memberList = facultyList;
  facultyList.map((member) => {
    member.imgSrc = member.imgSrc.replace(
      "/upload/",
      `/upload/w_400,q_auto,f_auto/`
    );
  });

  res.status(200).json({
    status: "success",
    results: facultyList.length,
    data: {
      faculty: facultyList,
    },
  });
};

// add an item in Faculty
exports.addFaculty = async (req, res) => {
  try {
    const facultyItem = new Faculty({
      name: req.body.name,
      position: req.body.position,
      qualification: req.body.qualification,
      experience: req.body.experience,
      description: req.body.description,
      imgSrc: req.file ? req.file.path : null, // <-- file name stored
    });

    const newItem = await facultyItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete an item from Faculty
exports.deleteFaculty = async (req, res, next) => {
  const facultyId = req.params.id; // FIXED
  const deletedItem = await Faculty.findByIdAndDelete(facultyId);
  if (!deletedItem) {
    return res.status(404).json({
      status: "fail",
      message: "Faculty item not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// update FacultyItem
exports.updateFaculty = async (req, res, next) => {
  const facultyId = req.params.id; // now from URL, not body

  const updatedData = {
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    qualification: req.body.qualification,
    experience: req.body.experience,
  };

  // If a new image was uploaded, update imgSrc
  if (req.file) {
    updatedData.imgSrc = req.file.path;
  }

  const updatedItem = await Faculty.findByIdAndUpdate(facultyId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return res.status(404).json({
      status: "fail",
      message: "Faculty item not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      faculty: updatedItem,
    },
  });
};
