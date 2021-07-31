// Requiring Express.
const express = require("express");
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from the controllers folder's todoController.js.
const todos = require("../controllers/todo.js");

router.post("/create", todos.createController);
router.get("/", todos.getAllController);
router.delete("/delete/:id", todos.removeOneController);

// Exporting controllers to server.js.
module.exports = router;
