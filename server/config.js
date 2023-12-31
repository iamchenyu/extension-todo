"use strict";

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const PORT = +process.env.PORT || "3001";

const MONGO_URL = process.env.MONGO_URL;

const BCRYPT_WORK_FACTOR = 12;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

// const SSL_CONFIG = isProduction ? { rejectUnauthorized: false } : false;

console.log("isProduction: ", isProduction);
console.log("PORT: ", PORT);
console.log("MONGO_URL: ", MONGO_URL);
console.log("BCRYPT_WORK_FACTOR: ", BCRYPT_WORK_FACTOR);
console.log("GOOGLE_CLIENT_ID: ", GOOGLE_CLIENT_ID);
console.log("GOOGLE_API_KEY: ", GOOGLE_API_KEY);
console.log("GOOGLE_CLIENT_SECRET: ", GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_REDIRECT_URL: ", GOOGLE_REDIRECT_URL);
// console.log("SSL_CONFIG: ", SSL_CONFIG);

module.exports = {
  isProduction,
  PORT,
  MONGO_URL,
  BCRYPT_WORK_FACTOR,
  GOOGLE_CLIENT_ID,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  //   SSL_CONFIG,
};
