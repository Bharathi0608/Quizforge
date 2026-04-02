const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ ADD THIS (ONLY THIS PART — no duplicate mongoose)
mongoose.connection.once("open", () => {
  console.log("📦 DB NAME:", mongoose.connection.name);
  console.log("🌐 HOST:", mongoose.connection.host);
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/score", require("./routes/score"));

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});