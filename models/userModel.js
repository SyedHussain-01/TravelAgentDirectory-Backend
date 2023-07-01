const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: false },
    date_of_birth: { type: Date, required: false },
    user_type: { type: Number, required: true }, // 0 -> Agent || 1 -> Traveller
  });

module.exports = mongoose.model("users", usersSchema)