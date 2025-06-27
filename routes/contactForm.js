var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const ContactForm = require("../models/contactForm");

router.post("/", async (req, res) => {
  const { firstName, lastName, structure, email, phoneNumber, message } =
    req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phoneNumberRegex =
    /^(?:(?:\+33|0033)[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

  try {
    if (
      !checkBody(req.body, [
        "firstName",
        "lastName",
        "structure",
        "email",
        "phoneNumber",
        "message",
      ])
    ) {
      return res
        .status(404)
        .json({ result: false, error: "Empty or missing field" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(404)
        .json({ result: false, error: "Wrong email format" });
    }
    if (!phoneNumberRegex.test(phoneNumber)) {
      return res
        .status(404)
        .json({ result: false, error: "Wrong phone number format" });
    }
    const newMessageData = new ContactForm({
      firstName,
      lastName,
      structure,
      email,
      phoneNumber,
      message,
    });
    const newMessage = await newMessageData.save();
    res.status(201).json({
      result: true,
      message: "message send",
      massageData: {
        firstName: newMessage.firstName,
        lastName: newMessage.lastName,
        structure: newMessage.structure,
        email: newMessage.email,
        phoneNumber: newMessage.phoneNumber,
        message: newMessage.message,
      },
    });
  } catch {
    res.status(500).json({ result: false, error: "Internal Server Error" });
  }
});

module.exports = router;
