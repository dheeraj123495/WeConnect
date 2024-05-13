const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(console.log("Connected to database"))
    .catch((error) => {
      console.log("Failed to connect to database");
      console.log(error);
    });
};

module.exports = connectWithDb;
