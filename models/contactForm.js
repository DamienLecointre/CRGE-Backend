const mongoose = require("mongoose");

const contactFormSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  structure: String,
  email: String,
  phoneNumber: Number,
  message: String,
});

const ContactForm = mongoose.model("contactForms", contactFormSchema);

module.exports = ContactForm;
