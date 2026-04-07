const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const authMiddleware = require("../middleware/authMiddleware");

/* ===========================
   ✅ GET ALL DONORS (PUBLIC)
   =========================== */
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ✅ GET MY DONOR PROFILE
   =========================== */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });

    if (!donor) {
      return res.json({ isDonor: false });
    }

    res.json({ isDonor: true, donor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ✅ ADD DONOR
   =========================== */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, bloodGroup, city, phone, location } = req.body;

    const already = await Donor.findOne({ userId: req.user.id });
    if (already) {
      return res.status(400).json({ message: "Already a donor" });
    }

    const donor = new Donor({
      name,
      bloodGroup,
      city,
      phone,
      location, // ✅ LOCATION SAVE
      userId: req.user.id,
    });

    await donor.save();
    res.status(201).json({ message: "Donor added", donor });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ✅ REMOVE ME AS DONOR
   =========================== */
router.delete("/me", authMiddleware, async (req, res) => {
  try {
    await Donor.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Removed as donor" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;