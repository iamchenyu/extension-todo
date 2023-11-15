const express = require("express");
const url = require("url");
const { authorizationUrl } = require("../googleAuth/getAuthUrl");
const getToken = require("../googleAuth/getToken");

const route = express.Router();

route.get("/signin", async (req, res, next) => {
  try {
    return res.redirect(301, authorizationUrl);
  } catch (e) {
    console.log(e);
  }
});

route.get("/oauth2callback", async (req, res, next) => {
  try {
    const callbackUrl = "/auth" + req.url;
    const user = await getToken(callbackUrl, res);
    console.log(user);
    return res.json({ user });
  } catch (e) {
    console.log(e);
  }
});

route.post("/", async (req, res, next) => {
  try {
    return res.status(201).json({ code: 200, message: "yay!" });
  } catch (e) {
    console.log(e);
  }
});
module.exports = route;
