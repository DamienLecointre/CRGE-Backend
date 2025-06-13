const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: String,
  inscriptionDate: Date,
  token: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
