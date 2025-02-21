const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userID: { type: String, ref: "User", required: true }, 
    companyName: { type: String, required: true },
    companyLogo: { type: String, required: true }, 
    participantName: { type: String, required: true },
    email: { type: String, required: true }, 
    contactNo: { type: Number, required: true }, 
    aadhaarImage: { type: String, required: true }, 
    passportPhoto: { type: String, required: true }, 
    gst: { type: String, required: true }, 
    panCardNumber: { type: String, required: true }, 
    tshirtSize: { type: String, enum: ["S", "M", "L", "XL", "XXL", "Others"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KycForm", kycSchema);
