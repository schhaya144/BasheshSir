const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  batch: { type: String, required: true },
  fee: { type: Number, required: true },
  banner: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Course", courseSchema);
