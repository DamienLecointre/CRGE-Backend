const express = require("express");
const router = express.Router();

const Nav = require("../models/navigations");
const Hero = require("../models/heros");
const Services = require("../models/serviceCards");
const Actualites = require("../models/actualites");

router.get("/", async (req, res) => {
  try {
    const [navData, heroData, serviceCards, actualites] = await Promise.all([
      Nav.find(),
      Hero.find(),
      Services.find(),
      Actualites.find(),
    ]);

    res.status(200).json({
      navData,
      heroData,
      serviceCards,
      actualites,
    });
  } catch (error) {
    console.error("Erreur /homepage-data:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
