var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const User = require("../models/users");

// -------------------
// ROUTE POST : SIGNUP
// -------------------
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    if (!checkBody(req.body, ["firstName", "lastName", "email", "password"])) {
      return res
        .status(404)
        .json({ result: false, error: "Empty or missing field" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(409)
        .json({ result: false, error: "Wrong email format" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(409).json({
        result: false,
        error:
          "Password have to include a minimum of 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
      });
    }
    const isExistingUser = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (isExistingUser) {
      return res
        .status(404)
        .json({ result: false, error: "Email already used" });
    }
    const token = uid2(32);
    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      token,
      inscriptionDate: new Date(),
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      result: true,
      message: "User create with success : ",
      user: {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        password: savedUser.password,
        token: savedUser.token,
        inscriptionDate: savedUser.inscriptionDate,
      },
    });
  } catch {
    res
      .status(500)
      .json({ result: false, error: "internal server error : ", error });
  }
});

// -------------------
// ROUTE POST : SIGNIN
// -------------------

router.post("/signin", async (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.status(200).json({
        result: true,
        message: "Sign in success",
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          token: data.token,
          inscriptionDate: data.inscriptionDate,
        },
      });
    } else {
      res.status(404).json({ result: false, error: "Wrong email or password" });
    }
  });
});

module.exports = router;
