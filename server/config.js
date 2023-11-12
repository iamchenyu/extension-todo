"use strict";

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const PORT = +process.env.PORT || "3001";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// const SSL_CONFIG = isProduction ? { rejectUnauthorized: false } : false;

console.log("isProduction: ", isProduction);
console.log("PORT: ", PORT);
console.log("GOOGLE_CLIENT_ID: ", GOOGLE_CLIENT_ID);
console.log("GOOGLE_API_KEY: ", GOOGLE_API_KEY);
// console.log("SSL_CONFIG: ", SSL_CONFIG);

module.exports = {
  isProduction,
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_API_KEY,
  //   SSL_CONFIG,
};
