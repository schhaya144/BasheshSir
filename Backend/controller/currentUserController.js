const UserModel = require('../models/users');

exports.getCurrentUser = async (req, res) => {
  try {
    console.log("User ID from token:", req.user?.id); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized: No user data found",
        error: true,
        success: false,
      });
    }

    // Use _id instead of u_id
    const currentUser = await UserModel.findOne({ _id: req.user.id }).select("-password");

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    console.log("User details:", currentUser);

    return res.status(200).json({
      data: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        contactNo: currentUser.contactNo,
        role: currentUser.role,
        permissions: currentUser.permissions || [],
        lastLogin: currentUser.lastLogin,
      },
      error: false,
      success: true,
      message: "User details retrieved successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};