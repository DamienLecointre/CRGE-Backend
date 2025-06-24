const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String, required: true },
});

const actualiteSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  titleImg: { type: String },
  date: { type: String, required: true },
  introImg: { type: String },
  intro: { type: String },
  sections: [sectionSchema],
});

const Actualite = mongoose.model("actualites", actualiteSchema);

module.exports = Actualite;
