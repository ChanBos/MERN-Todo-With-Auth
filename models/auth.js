// Requiring Mongoose.
const mongoose = require("mongoose");
// Requiring BCrypt.
const bcrypt = require("bcrypt");
// Requiring JWT.
// const jwt = require("jsonwebtoken");

/**
 * Created a model, defining the schema of the login details in order to save and retrieve data.
 * Set the type of the name, username and password to strings and made the fields required and added messages to state this.
 */

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please enter your name."],
  },
  Username: {
    type: String,
    required: [true, "Please enter your username."],
  },
  Password: {
    type: String,
    required: [true, "Please enter your password."],
  },
});

userSchema.statics.findAndValidate = function (username, password) {
  const foundUser = this.findOne({ username });
  const isValid = bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};

/**
 * Hashing the password before saving the password to the database. Doing so via Bcrypt's hashSync() method. Added the salt rounds for extra
 * security. Set it at the recommended 12 rounds.
 */

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

// Exporting userSchema to server.js.
module.exports = mongoose.model("User", userSchema);
