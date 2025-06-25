var express = require("express");
var router = express.Router();
const Nav = require("../models/navigations");

router.get("/", async (req, res) => {
  try {
    const nav = await Nav.find();
    // console.log(nav);
    res.status(200).json({
      result: true,
      message: "Navigation data content added",
      navData: nav,
    });
  } catch (error) {
    console.error("Erreur dans GET /navigations :", error);
    res.status(500).json({ result: false, error: "Files not found" });
  }
});

module.exports = router;
