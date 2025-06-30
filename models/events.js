const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const audienceSchema = new mongoose.Schema({
  description: String,
  prerequisites: String,
});

const programmeSchema = new mongoose.Schema({
  subtitle: String,
  points: [String],
});

const pricingSchema = new mongoose.Schema({
  adherent: Boolean,
  date: String,
  time: String,
  duration: String,
  price: String, // facultatif (ex : certains webinaires adhérents n'ont pas de prix)
});

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  lieu: { type: String, required: true },
  speaker: speakerSchema, // requis dans tous les cas selon ta BDD actuelle
  audience: audienceSchema, // facultatif
  objectives: [String], // facultatif
  programme: [programmeSchema], // facultatif
  description: [String], // requis dans tous les cas
  pricing: [pricingSchema], // requis, mais certains champs internes sont facultatifs
  funding: String, // facultatif
});

const Events = mongoose.model("events", eventSchema);

module.exports = Events;
