const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data:{
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true,
  },
})

const packageSchema = new mongoose.Schema({
  agent_id: { type: String, required: true },
  packageName: { type: String, required: true },
  destinations: { type: Array, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  tour_fee: { type: String, required: true },
  start_date: { type: Date, required: false, default: null },
  end_date: { type: Date, required: false, default: null },
  images: { type: [imageSchema], required: false },
});

module.exports = mongoose.model("packages", packageSchema);
