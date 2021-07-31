// Requiring Express.
const express = require("express");
// Initializing express with variable "app".
const app = express();
// Requiring CORS.
const cors = require("cors");
// Requiring body-parser.
const bodyParser = require("body-parser");
// Requiring Mongoose.
const mongoose = require("mongoose");
// Requiring logger from Morgan.
const logger = require("morgan");
// Requiring Helmet.
const helmet = require("helmet");
// Requiring dotenv.
const dbConfig = require("./config/db.config.js");
// Requiring the routes index.js file.
const todoRoutes = require("./routes/todo.js");
const authRoutes = require("./routes/auth.js");
// Requiring session from Express Session.
// const session = require("express-session");
// Requiring JWT.
const jwt = require("jsonwebtoken");

/**
 * Enabling App usages.
 */

// Included the body-parser middleware so that the Express server is able to access content that is passed in the body of the HTTP request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enabling middleware to allow server to access MongoDB. To accept requests to the body in .json format.
// Added credentials (set to boolean value true) and origin (set environment) headers to CORS to handle cross-site request cookies.
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Enabling app to use Helmet to secure the code.
app.use(helmet());

app.set("secretKey", "nodeRestApi");

// Enabling session storage by using Express Session.
// app.use(session({ secret: "not a good secret" }));

// Enabling the connection to MongoDB via the uri from the config file.
// Added useNewUrlParser flag to allow falling back to the old parser should a bug be found in the new parser.
// Added useUnifiedTopology to set up a connection string and begin doing operations.
const uri = `mongodb+srv://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@cluster1.7qs4j.mongodb.net/todo?retryWrites=true&w=majority`;
console.log(
  `mongodb+srv://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@cluster1.7qs4j.mongodb.net/todo?retryWrites=true&w=majority`
);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
console.log(uri);

// Should an error occur connecting to the MongoDB database, a message will be logged to the console as a notification of the error.
mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

// Logging a confirmation message to the console should the connection be successful.
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

function validateUser(req, res, next) {
  //validate the user
  //if user valid (database)
    //create JWT on Server (Express) and send to client(React)
    //(Automatically means that they can be logged in)
    //Post/Delete a new todo,then send the JWT from React to Express & validate JWT (on Express)
        //then proceed with request
      //else not valid, token not accepted
  jwt.verify(
    req.headers["x-access-token"], //the actual token obtain from React
    req.app.get("secretKey"),  //The actual secret key (in your this would be "nodeRestApi"
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

// Enabling the api app to use the routes from the todoRouter.js and authRouter.js files.
app.use("/todo", validateUser, todoRoutes);
app.use("/user", authRoutes);

// Specified to listen to port 8080's HTTP requests. Modified the port code in order to deploy the app to Heroku.
// Logging a response to the console to confirm that the server is listening to port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(
  "Navigate to http://localhost:8080/todo. Server is listening on port",
  PORT
);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

// If an error occurs locally, it gets passed to our error handler and a message will display stating that "Something Broke" in development.
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  next(err);
});
