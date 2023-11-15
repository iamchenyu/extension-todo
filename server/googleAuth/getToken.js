const url = require("url");
const { oauth2Client } = require("./getAuthUrl");

let userCredential = null;

module.exports = async function getToken(callbackUrl) {
  let q = url.parse(callbackUrl, true).query;

  if (q.error) {
    // An error response e.g. error=access_denied
    console.log("Error:" + q.error);
  } else {
    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);

    /** Save credential to the global variable in case access token was refreshed.
     * ACTION ITEM: In a production app, you likely want to save the refresh token
     *              in a secure persistent database instead. */
    userCredential = tokens;

    return userCredential;
  }
};
