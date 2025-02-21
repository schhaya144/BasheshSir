
// const jwt = require("jsonwebtoken");

// // async function authToken(req, res, next) {
// //   const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

// //   if (!token) {
// //     return res.status(401).json({ message: "Unauthorized: No token provided" });
// //   }

// //   jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
// //     if (err) {
// //       return res.status(401).json({ message: "Session expired, please log in again." });
// //     }

// //     // Attach user details to `req.user`
 
// //     req.user = {
// //       id: decoded.u_id, 
// //       contactNo: decoded.contactNo
// //     };

// //     // Check if token is expiring soon and refresh if needed
// //     if (Date.now() / 1000 > decoded.exp - 60 * 5) {
// //       const newToken = jwt.sign(
// //         { u_id: decoded.u_id, contactNo: decoded.contactNo },
// //         process.env.TOKEN_SECRET_KEY,
// //         { expiresIn: "8h" }
// //       );

// //       res.cookie("token", newToken, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === "production",
// //         sameSite: "None",
// //       });

// //       req.newToken = newToken;
// //     }

// //     console.log("Authenticated User:", req.user);
// //     next();
// //   });
// // }
// async function authToken(req, res, next) {
//   const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Session expired, please log in again." });
//     }

//     // Attach user details to `req.user`
//     req.user = {
//       id: decoded.u_id, 
//       contactNo: decoded.contactNo,
//       role: decoded.role // Add this line to include the role
//     };

//     // Check if token is expiring soon and refresh if needed
//     if (Date.now() / 1000 > decoded.exp - 60 * 5) {
//       const newToken = jwt.sign(
//         { u_id: decoded.u_id, contactNo: decoded.contactNo, role: decoded.role }, // Include role in new token
//         process.env.TOKEN_SECRET_KEY,
//         { expiresIn: "8h" }
//       );

//       res.cookie("token", newToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None",
//       });

//       req.newToken = newToken;
//     }

//     console.log("Authenticated User:", req.user);
//     next();
//   });
// }

// module.exports = authToken;
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

async function authToken(req, res, next) {
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Session expired, please log in again." });
    }

    // Fetch user details from the database
    const user = await UserModel.findOne({ u_id: decoded.u_id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user data to `req.user`
    req.user = {
      id: user.u_id,  // Change to _id to u_id match MongoDB
      role: user.role,
      permissions: user.permissions || [], 
      name: user.name,  // Added name for response
      email: user.email,
      contactNo: user.contactNo,
      lastLogin: user.lastLogin,
    };

    // Token refresh logic
    if (Date.now() / 1000 > decoded.exp - 60 * 5) {
      const newToken = jwt.sign(
        { u_id: user._id, role: user.role, permissions: user.permissions },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "8h" }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });

      req.newToken = newToken;
    }

    console.log("Authenticated User:", req.user);
    next();
  });
}

module.exports = authToken;
