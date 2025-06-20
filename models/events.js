const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  inscriptionDate: Date,
  addresses: [addressSchema],
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
