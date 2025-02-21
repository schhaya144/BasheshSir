const UserModel = require("../../models/users");



// Middleware to check if user is an Admin
const isAdmin = async (req, res, next) => {
  const admin = await UserModel.findOne({ u_id: req.body.admin_id });

  if (!admin || admin.role !== 1) {
    return res.status(403).json({ message: "Access denied! Only Admins can perform this action." });
  }
  
  next();
};

// API to Create a Sub-Admin
exports.subadmin= isAdmin, async (req, res) => {
  try {
    const { u_id, name, contactNo, email, password, permissions } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubAdmin = new UserModel({
      u_id,
      name,
      contactNo,
      email,
      password: hashedPassword,
      role: 2,
      permissions,
    });

    await newSubAdmin.save();
    res.status(201).json({ message: "Sub-Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Sub-Admin", error });
  }
}

// update 
router.put("/update-permissions/:subAdminId", isAdmin, async (req, res) => {
  try {
    const { subAdminId } = req.params;
    const { permissions } = req.body; // Example: ['manage_users', 'view_reports']

    const subAdmin = await UserModel.findOne({ u_id: subAdminId });

    if (!subAdmin || subAdmin.role !== 2) {
      return res.status(404).json({ message: "Sub-Admin not found" });
    }

    subAdmin.permissions = permissions;
    await subAdmin.save();

    res.status(200).json({ message: "Permissions updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating permissions", error });
  }
});


const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    const user = await UserModel.findOne({ u_id: req.body.user_id });

    if (!user || user.role !== 2 || !user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied!" });
    }

    next();
  };
};

router.post("/add-user", hasPermission("manage_users"), async (req, res) => {
  try {
    // Code to add a user
    res.status(201).json({ message: "User added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});









const createSubAdmin = async (req, res) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ message: "Access denied. Only admins can create sub-admins." });
    }

    const { name, email, password, permissions } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubAdmin = new UserModel({
      u_id: Math.floor(Math.random() * 100000),
      name,
      email,
      password: hashedPassword,
      role: 2, // Sub-admin role
      permissions, // Assign specific permissions
    });

    await newSubAdmin.save();

    res.status(201).json({ message: "Sub-admin created successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
