const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGNUP (REGISTER)
// SIGNUP (REGISTER)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // ✅ DEFAULT ROLE
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
  {
    id: user._id,
    role: user.role, // 👈 ADD THIS
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    res.json({
  message: "Login successful",
  token,
  role: user.role, // 👈 ADD THIS
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
  console.error("LOGIN ERROR:", error.message);
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
}

});


module.exports = router;
