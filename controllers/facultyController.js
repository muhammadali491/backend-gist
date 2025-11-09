const Faculty = require("../models/facultyModel");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
// get all items from Faculty
exports.getFaculty = async (req, res, next) => {
  const facultyList = await Faculty.find();
  // console.log("our faculty is : ", facultyList);
  // facultyList.map((faculty) => {
  //   faculty.imgSrc = `${BASE_URL}/uploads/${faculty.imgSrc}`;
  // });
 
  facultyList.map((faculty) => {
  if (faculty.imgSrc) {
    // Remove newlines and get only the filename
    const fileName = faculty.imgSrc.replace(/\n/g, '').split('/').pop();
    faculty.imgSrc = `${BASE_URL}/uploads/${fileName}`;
  }
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
      imgSrc: req.file ? req.file.filename : null, // <-- file name stored
    });

    const newItem = await facultyItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.addFaculty = async (req, res, next) => {
//   const facultyItem = new Faculty({
//     name: req.body.name,
//     position: req.body.position,
//     description: req.body.description,
//     imgSrc: req.body.imgSrc,
//     qualification: req.body.qualification,
//     experience: req.body.experience,
//   });
//   const newItem = await facultyItem.save();
//   res.status(201).json(newItem);
// };

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
  console.log("BACKEND HIT: UPDATE FACULTY");

  // console.log("PARAMS:", req.params);
  // console.log("BODY:", req.body);
  // console.log("FILE:", req.file);
  console.log("Starting update");
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
    updatedData.imgSrc = req.file.filename;
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

// exports.updateFaculty = async (req, res, next) => {
//   console.log("Starting update");
//   const facultyId = req.body._id;
//   const updatedData = {
//     name: req.body.name,
//     position: req.body.position,
//     description: req.body.description,
//     imgSrc: req.body.imgSrc,
//     qualification: req.body.qualification,
//     experience: req.body.experience,
//   };
//   console.log("Updating Faculty with ID:", facultyId);
//   const updatedItem = await Faculty.findByIdAndUpdate(facultyId, updatedData, {
//     new: true,
//     runValidators: true,
//   });
//   console.log("Updated Item:", updatedItem);
//   if (!updatedItem) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Faculty item not found",
//     });
//   }
//   console.log("Update successful");
//   res.status(200).json({
//     status: "success",
//     data: {
//       faculty: updatedItem,
//     },
//   });
// };
