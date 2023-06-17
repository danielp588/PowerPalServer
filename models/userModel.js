const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  adress: {
    type: {
      country: String,
      city: String,
      street: String,
      home_num: String,
      zip: Number,
    },
    required: false,
  },
});



module.exports = mongoose.model("User", userSchema);