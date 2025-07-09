const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  role: String,
  picture: String,
});

const offerItemSchema = new mongoose.Schema({
  title: String,
  details: [String],
  resource: {
    label: String,
    published: String,
    format: String,
    size: String,
  },
});

const resourceItemSchema = new mongoose.Schema({
  label: String,
  published: String,
  format: String,
  size: String,
});

const modalitiesItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  themes: [String],
  note: String,
});

const offerStageSchema = new mongoose.Schema({
  name: String,
  subtopics: mongoose.Schema.Types.Mixed, // Peut contenir objets ou tableaux
});

const toolItemSchema = new mongoose.Schema({
  picture: String,
  content: [String],
});

const sectionSchema = new mongoose.Schema({
  type: { type: String, required: true },

  // Types différents de contenus possibles
  content: mongoose.Schema.Types.Mixed, // pour intro, access, complaints, etc.
  members: [memberSchema], // pour team
  items: [mongoose.Schema.Types.Mixed], // pour offers, resources, modalities, benefits, etc.
  exclusions: [String], // pour offer_scope
  access: String, // pour offer_scope
  topics: [String], // pour custom_support
  certification: [String], // pour commitments
  stages: [offerStageSchema], // pour offer_stages
  item: resourceItemSchema, // pour resource (objet unique)
});

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sections: [sectionSchema],
  },
  { collection: "services" }
);

const Services = mongoose.model("services", serviceSchema);

module.exports = Services;
