const mongoose = require("mongoose");

const subHeroSchema = mongoose.Schema({
  title: String,
  paragraph: String,
  imgSrc: String,
  imgAlt: String,
});

const heroSchema = mongoose.Schema({
  heroHome: subHeroSchema,
  heroEvent: subHeroSchema,
});

const Hero = mongoose.model("heros", heroSchema);

module.exports = Hero;
