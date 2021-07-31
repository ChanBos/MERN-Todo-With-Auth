// Requiring dotenv.
require("dotenv").config();

/**
 * Calling the config function.
 * Set the credentials that will be used to connect to MongoDB. Created a .env file, added my credentials to this and added the .env file to
 * the gitignore file for security purposes.
 */

module.exports = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
