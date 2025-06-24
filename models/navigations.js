const mongoose = require("mongoose");

const navigationSchema = mongoose.Schema({
  listData: {
    type: [String], // Liste principale des onglets de navigation
    required: true,
  },
  crgeSubListdata: {
    type: [String], // Sous-menu pour "Le CRGE"
    required: true,
  },
  geSubListdata: {
    type: [String], // Sous-menu pour "Les Groupements d'employeurs"
    required: true,
  },
  servicesSubListdata: {
    type: [String], // Sous-menu pour "Nos services"
    required: true,
  },
});

const Navigation = mongoose.model("navigations", navigationSchema);

module.exports = Navigation;
