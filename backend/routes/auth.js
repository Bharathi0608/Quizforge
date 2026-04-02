const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 👤 Create user
    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    // ✅ Send response
    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // 🎟️ Generate token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET
    );

    res.json({ token, user });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login error" });
  }
});

module.exports = router;
