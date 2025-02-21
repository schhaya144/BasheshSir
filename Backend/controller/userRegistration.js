const bcrypt = require('bcryptjs');
const UserModel = require("../models/users");

exports.userRegisterationController = async (req, res) => {
  try {
    const { name, contactNo, whatsappNo, email, companyId, gst, companyWebsite, password } = req.body;

    // Check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Generate a unique u_id
    const lastUser = await UserModel.findOne().sort({ u_id: -1 });
    const newUserId = lastUser ? lastUser.u_id + 1 : 6000010;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with role 3 (default role)
    const newUser = new UserModel({
      u_id: newUserId,
      name,
      contactNo,
      whatsappNo,
      email,
      companyId,
      gst,
      companyWebsite,
      password: hashedPassword,
      role: 3,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// get all the data

exports.getAllUsersController = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    // Find the user by ID and update the fields
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...updates, lastLogin: updates.lastLogin || Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err.message);
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};
