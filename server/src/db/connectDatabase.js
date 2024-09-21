const mongoose = require("mongoose");

const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbCluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DATABASE;

const dbConnectionURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    await mongoose.connect(dbConnectionURI);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDatabase;
