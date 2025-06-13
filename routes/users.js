var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

// -------------------
// ROUTE POST : SIGNUP
// -------------------

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!checkBody(firstName, lastName, email, password, confirmPassword)) {
      return res
        .status(400) // 400 = Bad Request
        .json({ result: false, error: "Missing or empty fields" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400) // 400 = Bad Request
        .json({ result: false, error: "Passwords do not match" });
    }
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (existingUser) {
      return res
        .status(409) // 409 = Conflict
        .json({ result: false, error: "Email already used" });
    }
    const hash = bcrypt.hashSync(password, 10);
    const token = uid2(32);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      token,
      inscriptionDate: new Date(),
    });

    const savedUser = await newUser.save();
    res
      .status(201) // 201 = Created
      .json({
        result: true,
        message: "User created successfully",
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          token: savedUser.token,
          inscriptionDate: savedUser.inscriptionDate,
        },
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ result: false, error: messages.join(", ") });
    }
    res.status(500).json({ result: false, error: "Error saving user" }); // 500 = Server error
  }
});

module.exports = router;
