const UserModel = require("../../models/users");

// Get all users
exports.getMembers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  
  // Update a user
  exports.updateMembers = async (req, res) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
  
  // Delete a user
  exports.deleteMembers = async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }


  exports.getTotalUsers = async (req, res) => {
    try {
      const totalCount = await UserModel.countDocuments(); // Count total users
  
      console.log("Total number of users:", totalCount); // Debugging
  
      res.status(200).json({ total: totalCount }); // Send response
    } catch (err) {
      console.error("Error counting users:", err);
      res.status(500).json({ error: "Error counting users." });
    }
  };