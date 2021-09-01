// Requiring Express.
const express = require("express");
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from the controllers folder's userController.js.
const users = require("../controllers/userControllers.js");
// Requiring controllers from the controllers folder's userController.js.
const verifyToken = require("../controllers/verifyToken.js");

// If the user data is requested and the token exists, the jwt.verify() method will be called. This is to decode the token, making it possible
// to view the original payload.
router.get("/user", verifyToken, users.getUserDataController);

router.post("/signup", users.signUpController);
router.post("/login", users.loginController);
router.get("/logout", users.logOutController);

// Exporting controllers to server.js.
module.exports = router;
