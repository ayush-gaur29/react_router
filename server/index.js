require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ayushgaur9557_db_user:DT2fN7LdEoVlQBcZ@redroute.tzr3quu.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());

app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
