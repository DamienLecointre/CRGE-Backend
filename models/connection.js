const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      connectTimeoutMS: 10000,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Arrêter l'app si la connexion échoue
  }
};

module.exports = connectDB;
