const express = require("express");
const adminRouter = express.Router();
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// POST /api/admin/login
adminRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid username" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ admin: { username: admin.username }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = adminRouter;
