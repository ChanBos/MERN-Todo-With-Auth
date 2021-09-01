// Requiring JWT.
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
// Requiring JWT secret.
const { JWT_SECRET } = require("../config/app.config.js");

/**
 * Created a token verification function.
 * Checking the header or url parameters or post parameters for token.
 * Verifying the secret and checking the expiration date.
 * If all is in order, saving to request for use in other routes.
 */

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
};

// Exporting controllers to userControllers.js.
module.exports = verifyToken;
