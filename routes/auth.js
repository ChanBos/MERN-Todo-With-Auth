// Requiring Express.
const express = require("express");
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from the controllers folder's authController.js.
const users = require("../controllers/auth.js");

router.post("/sign-up", users.signUpController);
router.post("/sign-in", users.signinController);
router.post("/sign-out", users.signoutController);

// router.get("/signout", auth.signoutController);
// router.get("/register", auth.registerController);
// router.get("/login", auth.signinController);
// router.get("/todo", users.registerController);
// router.post("/signin", auth.signinController);

// Exporting controllers to server.js.
module.exports = router;
