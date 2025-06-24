const mongoose = require("mongoose");

const serviceCardSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const ServiceCards = mongoose.model("serviceCards", serviceCardSchema);

module.exports = ServiceCards;
