// Requiring Mongoose.
const mongoose = require("mongoose");

/**
 * Created a model, defining the schema of the users in order to save and retrieve data.
 * Set the type of the users to strings and the date and due to dates.
 */

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    Email: {
      type: String,
      required: [true, "Please enter your email."],
      // unique: true,
      lowercase: true,
    },
    Password: {
      type: String,
      required: [true, "Please enter your password."],
    },
  },
  {
    timestamps: true,
  }
);

// Exporting UserShema userController.js.
module.exports = mongoose.model("User", userSchema);
