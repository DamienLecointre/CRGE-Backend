var express = require("express");
var router = express.Router();
const Nav = require("../models/navigations");

router.get("/", async (req, res) => {
  try {
    const nav = await Nav.find();
    res
      .status(201)
      .json({ result: true, message: "Navigation files found", navData: nav });
  } catch (error) {
    res.status(500).json({ result: false, error: "Files not found" });
  }
});

module.exports = router;
