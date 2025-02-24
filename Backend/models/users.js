const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    
    u_id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    contactNo: { type: Number },
    whatsappNo: { type: Number },
    email: { type: String },
    companyId: { type: String },
    gst: { type: String },
    companyWebsite: { type: String },
    password: { type: String },
    role: { type: Number, enum: [1, 2, 3], default: 3, required: true },
    permissions: { type: [String], default: [] }, 
}
);

const UserModel = mongoose.model("allusers", userSchema);

module.exports = UserModel;
