const express = require("express");
const url = require("url");
const https = require("https");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { authorizationUrl } = require("../googleAuth/getAuthUrl");
const getToken = require("../googleAuth/getToken");
const User = require("../schemas/User");
const retriveGoogleInfo = require("../googleAuth/retriveGoogleInfo");
const { BCRYPT_WORK_FACTOR } = require("../config");

const route = express.Router();

route.get("/login", async (req, res, next) => {
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
    // get user's info on Google
    const { data } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${user.id_token}`
    );
    // const userInfo = await retriveGoogleInfo(user.id_token);
    // save the user info to mongodb
    // hash the refresh token
    // const hashed = await bcrypt.hash(user.refresh_token, BCRYPT_WORK_FACTOR);
    // if (!hashed) console.log("")

    console.log(user);
    // redirect to the homepage?
    return res.json({ data });
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

route.get("/revoke", async (req, res, next) => {
  try {
    // https://accounts.google.com/o/oauth2/revoke?token=ya29.a0AfB_byAqJA8_98mYZY_LNLXkpwG7gRe0S9_7olXFQaXGLn0iULbNU3KFiN8g4tDrXf_k-x8vZjFiTqrshQ7WVwHlJGdlVUT0LEXSiF2F1STn1asdC1LayK-vU5vKA7bGSi_4trEl682mN5dcBHse4DmJsrm_bNvpCpQ_aCgYKAeMSARMSFQHGX2MiHQq7gyiNQS-764QwZDOrrA0171
    // Build the string for the POST request
    let postData =
      "ya29.a0AfB_byC62o-kfk8ncAK2pyyhIg6-iD30YbwKN_EuLe96PMI2lFUqupASnG3ZYyacAA2et2BUSKivrPlahCB_oqEYTyHKb0ZvXdjwGfY8VOl6P7-UpYbFvFv56kpNegpZDEGis5OF7IAY5kyU_DKY1P4OpSnjANslUOjeaCgYKASUSARESFQHGX2Miq3rjwjYfVdxU9E--tepJSA0171";

    // Options for POST request to Google's OAuth 2.0 server to revoke a token
    let postOptions = {
      host: "oauth2.googleapis.com",
      port: "443",
      path: "/revoke",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    // Set up the request
    const postReq = https.request(postOptions, function (res) {
      res.setEncoding("utf8");
      res.on("data", (d) => {
        console.log("Response: " + d);
      });
    });

    postReq.on("error", (error) => {
      console.log(error);
    });

    // Post the request with data
    postReq.write(postData);
    postReq.end();
  } catch (e) {
    console.log(e);
  }
});
module.exports = route;
