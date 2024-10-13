const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) => {
      console.error(error);
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
