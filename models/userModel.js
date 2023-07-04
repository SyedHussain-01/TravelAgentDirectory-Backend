const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, },
    pass: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, },
    phone: { type: Number, required: true },
    city: { type: String, required: false, default: null },
    date_of_birth: { type: Date, required: false, default: null },
    user_type: { type: Number, required: true }, // 0 -> Agent || 1 -> Traveller
  });

module.exports = mongoose.model("users", usersSchema)