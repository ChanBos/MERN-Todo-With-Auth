// Requiring Express.
const express = require("express");
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from the controllers folder's todoController.js.
const todos = require("../controllers/todoControllers.js");

router.get("/gettodo", todos.getAllTodosController);
router.post("/create", todos.createController);
router.delete("/delete/:id", todos.removeOneController);

// Exporting controllers to server.js.
module.exports = router;
