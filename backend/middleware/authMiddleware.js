// // // // // const jwt = require("jsonwebtoken");

// // // // // module.exports = function (req, res, next) {
// // // // //   const token = req.header("Authorization");

// // // // //   if (!token) return res.status(401).json({ msg: "No token" });

// // // // //   try {
// // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // // //     req.user = decoded.id;
// // // // //     next();
// // // // //   } catch {
// // // // //     res.status(401).json({ msg: "Invalid token" });
// // // // //   }
// // // // // };

// // // // const jwt = require("jsonwebtoken");

// // // // module.exports = function (req, res, next) {
// // // //   const authHeader = req.header("Authorization");

// // // //   if (!authHeader) return res.status(401).json({ msg: "No token" });

// // // //   // ✅ FIX: remove "Bearer "
// // // //   const token = authHeader.split(" ")[1];

// // // //   try {
// // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // // //     req.user = decoded; // now contains id + name
// // // //     next();
// // // //   } catch {
// // // //     res.status(401).json({ msg: "Invalid token" });
// // // //   }
// // // // };

// // // const jwt = require("jsonwebtoken");

// // // module.exports = function (req, res, next) {
// // //   const authHeader = req.header("Authorization");

// // //   if (!authHeader) {
// // //     return res.status(401).json({ msg: "No token" });
// // //   }

// // //   // ✅ remove "Bearer "
// // //   const token = authHeader.split(" ")[1];

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     req.user = decoded; // { id, name }
// // //     next();
// // //   } catch {
// // //     res.status(401).json({ msg: "Invalid token" });
// // //   }
// // // };

// // const jwt = require("jsonwebtoken");

// // module.exports = function (req, res, next) {
// //   const authHeader = req.header("Authorization");

// //   if (!authHeader) return res.status(401).json({ msg: "No token" });

// //   const token = authHeader.split(" ")[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded; // { id, name }
// //     next();
// //   } catch {
// //     res.status(401).json({ msg: "Invalid token" });
// //   }
// // };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) return res.status(401).json({ msg: "No token" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, name }
//     next();
//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };


const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.log("❌ No Authorization header");
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ Token missing");
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ TOKEN DECODED:", decoded);

    req.user = decoded; // { id, name }
    next();
  } catch (err) {
    console.log("❌ Invalid token");
    res.status(401).json({ msg: "Invalid token" });
  }
};