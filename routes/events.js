var express = require("express");
var router = express.Router();
const Event = require("../models/events");

router.get("/", async (req, res) => {
  try {
    const eventData = await Event.find();
    res
      .status(200)
      .json({ result: true, message: "Events data content added", eventData });
  } catch (error) {
    res.status(500).json({ result: false, error: "serveur error : ", error });
  }
});

module.exports = router;
