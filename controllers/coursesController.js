const Courses = require("../models/coursesModel");
// get all items from Courses
exports.getCourses = async (req, res, next) => {
  try {
    const coursesList = await Courses.find();
    coursesList.map((course) => {
      course.image = course.image.replace(
        "/upload/",
        `/upload/w_400,q_auto,f_auto/`
      );
    });
    res.status(200).json({
      status: "success",
      results: coursesList.length,
      data: {
        courses: coursesList,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// add an item in Courses
exports.addCourses = async (req, res, next) => {
  try {
    const coursesItem = new Courses({
      title: req.body.title,
      instructor: req.body.instructor,
      subtitle: req.body.subtitle,
      intro: req.body.intro,
      description: req.body.description,
      duration: req.body.duration,
      image: req.file ? req.file.path : null,
    });
    const newItem = await coursesItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// delete an item from Courses
exports.deleteCourses = async (req, res, next) => {
  try {
    const coursesId = req.params.id;
    const deletedItem = await Courses.findByIdAndDelete(coursesId);
    if (!deletedItem) {
      return res.status(404).json({
        status: "fail",
        message: "Courses item not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// update CoursesItem
exports.updateCourses = async (req, res, next) => {
  try {
    const coursesId = req.params.id;
    const updatedData = {
      title: req.body.title,
      instructor: req.body.instructor,
      subtitle: req.body.subtitle,
      intro: req.body.intro,
      description: req.body.description,
      duration: req.body.duration,
      // image: req.body.image,
    };
    if (req.file) {
      updatedData.image = req.file.path;
    }
    const updatedItem = await Courses.findByIdAndUpdate(
      coursesId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        status: "fail",
        message: "Courses item not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        courses: updatedItem,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
