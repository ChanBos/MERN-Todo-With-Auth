// Requiring the schemas that has been created in the todoModel.js file.
const Todo = require("../models/todo.js");
// Requiring Mongoose.
const mongoose = require("mongoose");
// Requiring JWT.
const jwt = require("jsonwebtoken");

/**
 * POST/ CREATE:
 * @required  Body properties: Model, Make, Owner, Registration, and the Address
 * @param {*} req Creating a new post with the property.
 * @param {*} res Updated copy of the content (copyContent).
 * @returns List of todos and a confirmation message is returned to confirm that the post has been created or an error message should the
 * request be unsuccessful.
 */

exports.createController = (req, res) => {
  let todo = new Todo({
    Todo: req.body.Todo,
    Date: req.body.Date,
    Due: req.body.Due,
  });
  todo
    .save()
    .then((todos) => res.json({ message: "Todo created successfully.", todos, jwt: token }))
    .catch((err) =>
      res.status(400).json({ message: "Error creating the todo.", err })
    );
};

/**
 * GET/ READ:
 * @required  Content.
 * @param {*} req Getting the array of todos.
 * @param {*} res Copy of the content (copyContent).
 * @returns A list of the current todos that are already written.
 */

// Requesting all the todos' information from MongoDB and retuning the response with the information.
exports.getAllController = (req, res) => {
  Todo.find()
    .then((todos) => res.json({todos, jwt: token}))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Error getting the todos' information.", err })
    );
};

/**
 * DELETE:
 * @required  Body properties: id.
 * @param {*} req Post with the matching id to be deleted.
 * @param {*} res Updated copy of the content (copyContent).
 * @returns List of cars and a confirmation message is returned to confirm that the post has been deleted or an error message should the
 * request be unsuccessful.
 */

// Fetching the information of one car by id for deletion.
exports.removeOneController = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todos) => res.json({ message: "Todo deleted successfully.", todos, jwt: token }))
    .catch((err) =>
      res.status(400).json({ message: "Error deleting the todo item.", err })
    );
};
