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
const morgan = require("morgan");
// Requiring Helmet.
const helmet = require("helmet");
// Requiring database configuration.
const dbConfig = require("./config/app.config.js");
// Requiring the routes index.js file.
const todoRoutes = require("./routes/todoRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");

/**
 * Enabling App usages.
 */

// Included the body-parser middleware so that the Express server is able to access content that is passed in the body of the HTTP request.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enabling middleware to allow server to access MongoDB. To accept requests to the body in .json format.
// Added credentials (set to boolean value true) and origin (set environment) headers to CORS to handle cross-site request cookies.
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Enabling app to use Helmet to secure the code. Disabled the `contentSecurityPolicy` middleware (keeps the rest) due to inline script errors.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Enabling the connection to MongoDB via the uri from the config file.
// Added useNewUrlParser flag to allow falling back to the old parser should a bug be found in the new parser.
// Added useUnifiedTopology to set up a connection string and begin doing operations.
const uri = `mongodb+srv://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@cluster1.7qs4j.mongodb.net/todo?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Should an error occur connecting to the MongoDB database, a message will be logged to the console as a notification of the error.
mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

// Logging a confirmation message to the console should the connection be successful.
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

// Enabling the api app to use the routes from the todoRouter.js and userRouter.js files.
app.use("/todos", todoRoutes);
app.use("/users", usersRoutes);

// Checking if the process is production mode and set for the index.html file from the build folder to be utilized, instead of the public folder.
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Specified to listen to port 8080's HTTP requests. Modified the port code in order to deploy the app to Heroku.
// Logging a response to the console to confirm that the server is listening to port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(
  "Navigate to http://localhost:8080. Server is listening on port",
  PORT
);

// Express doesn't consider not found 404 as an error so handled 404 explicitly.
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// If an error occurs locally, it gets passed to our error handler and a message will display stating that "Something Broke" in development.
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  next(err);
});
