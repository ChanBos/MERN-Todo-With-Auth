// Requiring the schemas that has been created in the todoModel.js file.
const Todo = require("../models/todoModels.js");
// Requiring Mongoose.
const mongoose = require("mongoose");

/**
 * POST/ CREATE:
 * @required  Body properties: Todo, Date, Due
 * @param {*} req Creating a new post with the properties.
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
    .then((todos) => {
      return res.json({ message: "Todo created successfully.", todos });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error creating the todo.", err });
    });
};

/**
 * GET/ READ:
 * @required  Content.
 * @param {*} req Requesting the authorized page and getting the array of todos.
 * @param {*} res Copy of the content (copyContent).
 * @returns An authorized pages that lists the current todos that are already written.
 */

exports.getAllTodosController = (req, res, next) => {
  Todo.find({})
    .then((todos) => {
      return res.json({ secret: "resource", todos });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Error getting the todos' information.", err });
    });
};

/**
 * DELETE:
 * @required  Body properties: id.
 * @param {*} req Post with the matching id to be deleted.
 * @param {*} res Updated copy of the content (copyContent).
 * @returns List of todos and a confirmation message is returned to confirm that the post has been deleted or an error message should the
 * request be unsuccessful.
 */

exports.removeOneController = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todos) => {
      return res.json({ message: "Todo deleted successfully.", todos });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Error deleting the todo item.", err });
    });
};
