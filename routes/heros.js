var express = require("express");
var router = express.Router();
const Hero = require("../models/heros");
const { checkBody } = require("../modules/checkBody");

router.get("/", async (req, res) => {
  try {
    const hero = await Hero.find();
    res
      .status(200)
      .json({
        result: true,
        message: "Hero data content added",
        heroData: hero,
      });
  } catch (error) {
    res.status(500).json({ result: false, error: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  const { title, paragraph, imgSrc, imgAlt } = req.body;

  if (!checkBody(req.body, ["title", "paragraph", "imgSrc", "imgAlt"])) {
    return res
      .status(400)
      .json({ result: false, error: "empty or missing fields" });
  }

  try {
    const newHero = new Hero({
      heroHome: {
        title,
        paragraph,
        imgSrc,
        imgAlt,
      },
      heroEvent: {},
    });

    const savedNewHero = await newHero.save();

    res.status(201).json({
      result: true,
      message: "Section created successfully",
      sectionData: savedNewHero.heroHome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: "server error" });
  }
});

module.exports = router;
