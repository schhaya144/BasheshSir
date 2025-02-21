const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/users");

const adminLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Restrict login access to only Admin (1) & Sub-Admin (2)
    if (![1, 2].includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Unauthorized role", success: false });
    }

    // Save previous lastLogin time
    const previousLogin = user.lastLogin;

    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { u_id: user.u_id, contactNo: user.contactNo, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    // Store user details in session
    req.session.user = {
      _id: user._id,
      u_id: user.u_id,
      contactNo: user.contactNo,
      name: user.name,
      email: user.email,
      role: user.role, // Send role to frontend
      lastLogin: user.lastLogin,
    };

    // Response with role-based access
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "None" }).json({
      message: "Login successful",
      previousLogin: previousLogin || null,
      sessionData: req.session.user,
      success: true,
      role: user.role, // Send role to frontend
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = adminLoginController;
