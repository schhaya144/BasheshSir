const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    mapUrl:{type: String,required: true},
    
  });
  

module.exports = mongoose.model('Event', eventSchema);
