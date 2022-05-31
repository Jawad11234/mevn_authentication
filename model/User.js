const mongoose = require("mongoose");
const Scheema = mongoose.Schema;

// Creating the User Model
const UserSchema = new Scheema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Exporting User Schema
module.exports = User = mongoose.model("user", UserSchema);
