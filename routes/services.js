var express = require("express");
var router = express.Router();
const Services = require("../models/services");

router.get("/:slug", async (req, res) => {
  try {
    const serviceData = await Services.findOne({ slug: req.params.slug });

    if (!serviceData) {
      return res
        .status(404)
        .json({ result: false, message: "Aucun service trouvé pour ce slug." });
    }

    res.status(200).json({
      result: true,
      message: "Contenu du service trouvé.",
      serviceData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ result: false, message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
