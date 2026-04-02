// // // // // const express = require("express");
// // // // // const bcrypt = require("bcryptjs");
// // // // // const jwt = require("jsonwebtoken");
// // // // // const User = require("../models/User");

// // // // // const router = express.Router();

// // // // // // Register
// // // // // router.post("/register", async (req, res) => {
// // // // //   const { name, email, password } = req.body;

// // // // //   const hashed = await bcrypt.hash(password, 10);

// // // // //   const user = new User({ name, email, password: hashed });
// // // // //   await user.save();

// // // // //   res.json({ message: "User registered" });
// // // // // });

// // // // // // Login
// // // // // router.post("/login", async (req, res) => {
// // // // //   const { email, password } = req.body;

// // // // //   const user = await User.findOne({ email });
// // // // //   if (!user) return res.status(400).json({ msg: "User not found" });

// // // // //   const isMatch = await bcrypt.compare(password, user.password);
// // // // //   if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

// // // // //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// // // // //   res.json({ token, user });
// // // // // });

// // // // // module.exports = router;

// // // // router.post("/login", async (req, res) => {
// // // //   const { email, password } = req.body;

// // // //   const user = await User.findOne({ email });
// // // //   if (!user) return res.status(400).json({ msg: "User not found" });

// // // //   const isMatch = await bcrypt.compare(password, user.password);
// // // //   if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

// // // //   // ✅ INCLUDE NAME IN TOKEN
// // // //   const token = jwt.sign(
// // // //     { id: user._id, name: user.name, email: user.email },
// // // //     process.env.JWT_SECRET
// // // //   );

// // // //   res.json({ token });
// // // // });

// // // const express = require("express");
// // // const Score = require("../models/Score");
// // // const auth = require("../middleware/authMiddleware");

// // // const router = express.Router();

// // // // Save score
// // // router.post("/add", auth, async (req, res) => {
// // //   try {
// // //     const { quizTitle, score, totalQuestions } = req.body;

// // //     const newScore = new Score({
// // //       userId: req.user.id, // ✅ FIXED
// // //       quizTitle,
// // //       score,
// // //       totalQuestions
// // //     });

// // //     await newScore.save();

// // //     res.json({ message: "Score saved successfully" });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: "Error saving score" });
// // //   }
// // // });

// // // // Get scores
// // // router.get("/", auth, async (req, res) => {
// // //   const scores = await Score.find({ userId: req.user.id }); // ✅ FIXED
// // //   res.json(scores);
// // // });

// // // module.exports = router;



// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");

// // const router = express.Router();

// // /* =========================
// //    REGISTER
// // ========================= */
// // router.post("/register", async (req, res) => {
// //   const { name, email, password } = req.body;

// //   try {
// //     // ✅ Validate fields
// //     if (!name || !email || !password) {
// //       return res.status(400).json({ msg: "All fields are required" });
// //     }

// //     // ✅ Check existing user
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ msg: "User already exists" });
// //     }

// //     // ✅ Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // ✅ Create user
// //     const user = new User({
// //       name,
// //       email,
// //       password: hashedPassword
// //     });

// //     await user.save();

// //     res.status(201).json({ message: "User registered successfully" });

// //   } catch (err) {
// //     console.error("REGISTER ERROR:", err);
// //     res.status(500).json({ msg: "Server error during registration" });
// //   }
// // });


// // /* =========================
// //    LOGIN
// // ========================= */
// // router.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // ✅ Validate fields
// //     if (!email || !password) {
// //       return res.status(400).json({ msg: "Email and password required" });
// //     }

// //     // ✅ Check user
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ msg: "User not found" });
// //     }

// //     // ✅ Compare password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ msg: "Incorrect password" });
// //     }

// //     // ✅ Create token (IMPORTANT: include name)
// //     const token = jwt.sign(
// //       {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email
// //       }
// //     });

// //   } catch (err) {
// //     console.error("LOGIN ERROR:", err);
// //     res.status(500).json({ msg: "Server error during login" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashed
//     });

//     await user.save();

//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

//     // ✅ include name in token
//     // const token = jwt.sign(
//     //   { id: user._id, name: user.name },
//     //   process.env.JWT_SECRET
//     // );
//     const token = jwt.sign(
//   { id: user._id, name: user.name }, // ✅ ADD THIS
//   process.env.JWT_SECRET
// );

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashed
//     });

//     await user.save();


//     router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {

//     const existingUser = await User.findOne({ email });
// if (existingUser) {
//   return res.status(400).json({ msg: "User already exists" });
// }



//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashed
//     });

//     await user.save();

//     // ✅ ADD THIS
//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });


//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

//     // ✅ include name in token
//     const token = jwt.sign(
//       { id: user._id, name: user.name },
//       process.env.JWT_SECRET
//     );

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// module.exports = router;

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