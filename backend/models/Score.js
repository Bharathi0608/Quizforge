const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String, // ✅ ADD THIS
  quizTitle: String,
  score: Number,
  totalQuestions: Number,
  answers: [ // ✅ ADD THIS (for next feature)
    {
      questionId: String,
      selectedIndex: Number,
      correct: Boolean
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", scoreSchema);
