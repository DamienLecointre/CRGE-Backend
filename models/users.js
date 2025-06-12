const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  inscriptionDate: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
