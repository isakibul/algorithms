require("dotenv").config();
const mongoose = require("mongoose");

const dbConnectionString = process.env.MONGODB_URI;

const dbConnection = () => {
  mongoose
    .connect(dbConnectionString)
    .then(() => console.log("Successfully connected to the database"))
    .catch((error) => console.error("MongoDB connection failed:", error));
};

module.exports = dbConnection;
