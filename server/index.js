require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);

// ERROR HANDLING (IMPORTANT)
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log("MongoDB connected");

  const PORT = process.env.PORT;

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
  });
})
.catch((err) => {
  console.error("MongoDB error:", err);
  process.exit(1);
});