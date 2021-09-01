// Requiring Mongoose.
const mongoose = require("mongoose");

/**
 * Created a model, defining the schema of the todos in order to save and retrieve data.
 * Set the type of the todos to strings and the date and due to dates.
 */

const todoSchema = mongoose.Schema(
  {
    Date: {
      type: Date,
    },
    Todo: {
      type: String,
    },
    Due: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Exporting TodoShema to todoController.js.
module.exports = mongoose.model("Todo", todoSchema);
