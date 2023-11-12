const express = require("express");

const route = express.Router();

route.post("/", async (req, res, next) => {
  try {
    return res.status(201).json({ code: 200, message: "yay!" });
  } catch (e) {
    console.log(e);
  }
});
module.exports = route;
