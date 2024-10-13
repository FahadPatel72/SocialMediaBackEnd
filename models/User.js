const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialHandle: {
    type: String,
    required: true,
  },
  images: [String],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
