const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("QuizForge Backend is running 🚀");
});

// Health check endpoint (for monitoring and diagnostics)
app.get("/api/health", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  const currentDbState = dbStates[mongoose.connection.readyState] || "unknown";

  res.json({
    status: "ok",
    database: currentDbState,
    dbConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection with fast timeout so requests don't hang if cluster is down/paused
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging 30s
    })
    .then(() => console.log("✅ MongoDB Connected successfully"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
      console.error("👉 If using Atlas free tier, check if cluster was paused or if 0.0.0.0/0 IP whitelist is added.");
    });
} else {
  console.warn("⚠️ MONGO_URI environment variable is not defined!");
}

mongoose.connection.once("open", () => {
  console.log("📦 DB NAME:", mongoose.connection.name);
  console.log("🌐 HOST:", mongoose.connection.host);
});

// Middleware: Fail fast if database is disconnected instead of hanging indefinitely on queries
app.use("/api", (req, res, next) => {
  if (req.path === "/health") return next();

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      msg: "Database is currently disconnected. Please ensure your MongoDB Atlas cluster is active and MONGO_URI is set correctly.",
      error: "DB_DISCONNECTED"
    });
  }
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/score", require("./routes/score"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
