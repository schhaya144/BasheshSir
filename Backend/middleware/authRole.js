const authRole = (requiredPermission) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(403).json({ message: "Access denied", success: false });
      }
  
      // Allow super admin (role: 1) to perform all actions
      if (req.user.role === 1) {
        return next();
      }
  
      // Check if the sub-admin has the required permission
      if (req.user.role === 2 && req.user.permissions.includes(requiredPermission)) {
        return next();
      }
  
      return res.status(403).json({ message: "Access denied", success: false });
    };
  };
  
  module.exports = authRole;
 
  