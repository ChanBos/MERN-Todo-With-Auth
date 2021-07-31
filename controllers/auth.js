// Requiring the schemas that has been created in the todoModel.js file.
const User = require("../models/auth.js");
// Requiring Mongoose.
const mongoose = require("mongoose");
// Requiring BCrypt.
const bcrypt = require("bcrypt");
// Requiring JWT.
const jwt = require("jsonwebtoken");

/**
 * POST/ CREATE:
 * @param {*} req
 * @param {*} res
 */

exports.signUpController = (req, res) => {
  let user = new User({
    Name: req.body.Name,
    Username: req.body.Username,
    Password: req.body.Password,
  });
  user
    .save()
    .then((users) => res.json({ message: "Registration successful.", users }))
    .catch((err) =>
      res.status(400).json({ message: "Registration unsuccessful.", err })
    );
};

exports.signinController = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, userInfo) {
    if (err) {
      next(err);
    } else if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
        expiresIn: "1h", //{algorithm: 'HS256'}
      });
      res.json({
        status: "success",
        message: "user found!!!",
        data: { user: userInfo, token: token },
      });
    } else {
      res.json({
        status: "error",
        message: "Incorrect login details.",
        data: null,
      });
    }
  });
};

exports.signoutController = (req, res) => {
  req.session.user_id = null;
  res.redirect("/signin");
};

/**
 * GET/ READ:
 * @param {*} req
 * @param {*} res
 */

// exports.registerController = (req, res) => {
//   res.render("/todo");
// };

// exports.signinController = (req, res) => {
//   res.render("signin");
// };

// const requireSignin = (req, res, next) => {
//   if (!req.session.user_id) {
//     return res.redirect("/signin");
//   }
//   next();
// };

// exports.secretController =
//   (requireSignin,
//   (req, res) => {
//     res.render("secret");
//   });
