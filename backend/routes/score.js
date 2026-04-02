// // // // // const express = require("express");
// // // // // const Score = require("../models/Score");
// // // // // const auth = require("../middleware/authMiddleware");

// // // // // const router = express.Router();

// // // // // // Save score
// // // // // router.post("/add", auth, async (req, res) => {
// // // // //   const { quizTitle, score, totalQuestions } = req.body;

// // // // //   const newScore = new Score({
// // // // //     userId: req.user,
// // // // //     quizTitle,
// // // // //     score,
// // // // //     totalQuestions
// // // // //   });

// // // // //   await newScore.save();

// // // // //   res.json({ message: "Score saved" });
// // // // // });

// // // // // // Get scores
// // // // // router.get("/", auth, async (req, res) => {
// // // // //   const scores = await Score.find({ userId: req.user });
// // // // //   res.json(scores);
// // // // // });

// // // // // module.exports = router;


// // // // const express = require("express");
// // // // const Score = require("../models/Score");
// // // // const auth = require("../middleware/authMiddleware");

// // // // const router = express.Router();

// // // // // ✅ SAVE SCORE
// // // // router.post("/add", auth, async (req, res) => {
// // // //   try {
// // // //     const { quizTitle, score, totalQuestions } = req.body;

// // // //     const newScore = new Score({
// // // //       userId: req.user.id,
// // // //       name: req.user.name, // ✅ store name
// // // //       quizTitle,
// // // //       score,
// // // //       totalQuestions
// // // //     });

// // // //     await newScore.save();

// // // //     res.json({ message: "Score saved successfully" });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ msg: "Error saving score" });
// // // //   }
// // // // });

// // // // // ✅ GET ALL SCORES (GLOBAL LEADERBOARD)
// // // // router.get("/", async (req, res) => {
// // // //   try {
// // // //     const scores = await Score.find().sort({ score: -1 });
// // // //     res.json(scores);
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Error fetching scores" });
// // // //   }
// // // // });

// // // // module.exports = router;



// // // const express = require("express");
// // // const Score = require("../models/Score");
// // // const auth = require("../middleware/authMiddleware");

// // // const router = express.Router();

// // // // SAVE SCORE
// // // router.post("/add", auth, async (req, res) => {
// // //   try {
// // //     const { quizTitle, score, totalQuestions } = req.body;

// // //     const newScore = new Score({
// // //       userId: req.user.id,
// // //       userName: req.user.name, // ✅ IMPORTANT
// // //       quizTitle,
// // //       score,
// // //       totalQuestions
// // //     });

// // //     await newScore.save();

// // //     res.json({ message: "Score saved successfully" });
// // //   } catch (err) {
// // //     res.status(500).json({ message: "Error saving score" });
// // //   }
// // // });

// // // // GET ALL SCORES (Leaderboard)
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const scores = await Score.find().sort({ score: -1 });
// // //     res.json(scores);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Error fetching scores" });
// // //   }
// // // });

// // // module.exports = router;

// // const express = require("express");
// // const Score = require("../models/Score");
// // const auth = require("../middleware/authMiddleware");

// // const router = express.Router();

// // // SAVE SCORE
// // router.post("/add", auth, async (req, res) => {
// //   try {
// //     const { quizTitle, score, totalQuestions } = req.body;
// //     const newScore = new Score({
// //   userId: req.user.id,
// //   userName: req.user.name, // ✅ MUST BE THIS
// //   quizTitle,
// //   score,
// //   totalQuestions
// // });
// //     // const newScore = new Score({
// //     //   userId: req.user.id,
// //     //   userName: req.user.name, // 🔥 THIS IS THE MAIN FIX
// //     //   quizTitle,
// //     //   score,
// //     //   totalQuestions
// //     // });

// //     await newScore.save();

// //     res.json({ message: "Score saved successfully" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Error saving score" });
// //   }
// // });

// // // GET ALL SCORES
// // router.get("/", async (req, res) => {
// //   try {
// //     const scores = await Score.find().sort({ score: -1 });
// //     res.json(scores);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Error fetching scores" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const Score = require("../models/Score");
// const auth = require("../middleware/authMiddleware");

// const router = express.Router();

// // SAVE SCORE
// router.post("/add", auth, async (req, res) => {
//   try {
//     const { quizTitle, score, totalQuestions } = req.body;

//     const newScore = new Score({
//       userId: req.user.id,
//       userName: req.user.name, // ✅ IMPORTANT
//       quizTitle,
//       score,
//       totalQuestions
//     });

//     await newScore.save();

//     res.json({ message: "Score saved successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving score" });
//   }
// });

// // GET ALL SCORES (Leaderboard)
// router.get("/", async (req, res) => {
//   try {
//     const scores = await Score.find().sort({ score: -1 });
//     res.json(scores);
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching scores" });
//   }
// });

// module.exports = router;

const express = require("express");
const Score = require("../models/Score");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// SAVE SCORE
router.post("/add", auth, async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);
    console.log("👤 USER:", req.user);

    const { quizTitle, score, totalQuestions } = req.body;

    const newScore = new Score({
      userId: req.user.id,
      userName: req.user.name,
      quizTitle,
      score,
      totalQuestions
    });

    await newScore.save();

    console.log("✅ SAVED SUCCESSFULLY");

    res.json({ message: "Score saved successfully" });
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: "Error saving score" });
  }
});

// GET ALL SCORES (Leaderboard)
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching scores" });
  }
});

module.exports = router;