const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: String,
  token: String,
  inscriptionDate: Date,
  admin: { type: Boolean, default: false },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
