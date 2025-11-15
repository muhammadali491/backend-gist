const Join = require("../models/joinModel");

// add an item in Join
exports.addJoin = async (req, res) => {
  try {
    const join = new Join({
      name: req.body.name,
      phone: req.body.phone,
      course: req.body.course,
      shift: req.body.shift,
      message: req.body.message,
    });

    const newItem = await join.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
