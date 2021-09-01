// Requiring dotenv.
require("dotenv").config();

/**
 * Calling the config function.
 * Set the credentials that will be used to connect to MongoDB and the secret that will be allocated for authentication purposes. Created a
 * .env file, added the credentials to this and added the .env file to the gitignore file for security purposes.
 */

module.exports = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};
