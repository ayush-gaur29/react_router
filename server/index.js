require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
      console.log("Server started");
    });

  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});