var express = require("express");
var router = express.Router();
const Actualite = require("../models/actualites");

router.get("/", async (req, res) => {
  try {
    const actualiteData = await Actualite.find();
    res.status(200).json({
      result: true,
      message: "Actuality data content added",
      actualiteData,
    });
  } catch (error) {
    res.status(500).json({ result: false, error: "serveur error : ", error });
  }
});

module.exports = router;
