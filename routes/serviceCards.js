var express = require("express");
var router = express.Router();
const ServiceCards = require("../models/serviceCards");

router.get("/", async (req, res) => {
  try {
    const serviceCardsData = await ServiceCards.find();
    res
      .status(201)
      .json({
        result: true,
        message: "Service cards data found",
        serviceCardsData,
      });
  } catch (error) {
    res.status(500).json({ result: false, error: "serveur error :", error });
  }
});

module.exports = router;
