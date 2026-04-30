const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB_URI;

const connectedDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to Database.");
    })
    .catch((error) => console.log("Error Connecting to Database", error));
};

module.exports = { connectedDatabase };
