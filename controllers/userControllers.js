// Requiring the schemas that has been created in the userModel.js file.
const User = require("../models/userModel.js");
// Requiring Mongoose.
const mongoose = require("mongoose");
// Requiring JWT.
const jwt = require("jsonwebtoken");
// Requiring Bcrypt.
const bcrypt = require("bcryptjs");
// Requiring JWT secret.
const { JWT_SECRET } = require("../config/app.config.js");

/**
 * POST/ CREATE:
 * Created a function to allow a user to sign up.
 * Stipulated the body requirements: Name, Email and Password.
 * If an error occurs, status 500 will be returned with an error.
 * If all is in order, a new user will be created in the database and the credentials will be saved.
 * The generated token will expire in 24 hours.
 * Generating the token and returning this, as well as with the status (200 - ok) and a message.
 */

exports.signUpController = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.Password, 8);

  User.create(
    {
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: 86400,
      });
      return res.status(200).send({ auth: true, token: token });
    }
  );
};

/**
 * GET/ READ:
 * Created a function to get the user's data.
 * Finding the user by ID and setting for the password to not be returned along with the rest of the data.
 * If an error occurs, status 500 will be returned with an error.
 * If all is in order, the user's data will be verified and returned.
 */

exports.getUserDataController = (req, res) => {
  User.findById(req.userId, { Password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
};

/**
 * POST/ CREATE:
 * Created a function to allow a user to login.
 * If an error occurs, either status 500 is shown for server issues or if the email is not found a 404 error will be shown.
 * Checking whether the user exists and using Bcrypt’s compareSync() method to compare the password sent with the request to the password in the
 * database.
 * If they match the token is signed and the expiration time set to 24 hours.
 */

exports.loginController = (req, res) => {
  User.findOne({ Email: req.body.Email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(
      req.body.Password,
      user.Password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).send({ auth: true, token: token });
  });
};

/**
 * GET/ READ:
 * Created a function to allow a user to log out.
 * Setting the token to null to end the session.
 */

exports.logOutController = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
