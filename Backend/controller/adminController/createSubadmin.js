const UserModel = require("../../models/users");
const bcrypt = require('bcryptjs');

exports.createSubadmin =async (req, res) => {
    try {
      const { name, email, password, permissions } = req.body;
  
      // Check if email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use", success: false });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create sub-admin with role 2
      const subAdmin = new UserModel({
        u_id: Date.now(),
        name,
        email,
        password: hashedPassword,
        role: 2, // Sub-admin
        permissions: permissions || [], // Assign given permissions
      });
  
      await subAdmin.save();
      res.status(201).json({ message: "Sub-admin created successfully", success: true });
    } catch (error) {
      console.error("Error creating sub-admin:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  }