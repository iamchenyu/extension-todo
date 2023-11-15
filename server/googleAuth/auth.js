const http = require("http");
const https = require("https");
const url = require("url");
const { google } = require("googleapis");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} = require("../config");

/**
 * Example Code:
 * https://developers.google.com/identity/protocols/oauth2/web-server#handlingresponse
 */

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

// Access scopes for Google Calendar.
// https://developers.google.com/identity/protocols/oauth2/scopes#calendar
const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

// Generate a url that asks permissions for the Calendar scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});
console.log(authorizationUrl);

/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */
let userCredential = null;

async function getToken(callbackUrl) {
  let q = url.parse(callbackUrl, true).query;
  console.log(callbackUrl);
  console.log(q);

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
}

// async function signIn(req, res) {
//   console.log("in signIn");
//   console.log(req.url);
//   if (req.url == "/") {
//     console.log("in /");
//     res.writeHead(301, { Location: authorizationUrl });
//   }

//   // Receive the callback from Google's OAuth 2.0 server.
//   if (req.url.startsWith("/oauth2callback")) {
//     // Handle the OAuth 2.0 server response
//     let q = url.parse(req.url, true).query.code;

//     if (q.error) {
//       // An error response e.g. error=access_denied
//       console.log("Error:" + q.error);
//     } else {
//       // Get access and refresh tokens (if access_type is offline)
//       let { tokens } = await oauth2Client.getToken(q);
//       oauth2Client.setCredentials(tokens);

//       /** Save credential to the global variable in case access token was refreshed.
//        * ACTION ITEM: In a production app, you likely want to save the refresh token
//        *              in a secure persistent database instead. */
//       userCredential = tokens;

//       console.log("userCredential: ", userCredential);
//       // Example of using Google Drive API to list filenames in user's Drive.
//       const drive = google.drive("v3");
//       drive.files.list(
//         {
//           auth: oauth2Client,
//           pageSize: 10,
//           fields: "nextPageToken, files(id, name)",
//         },
//         (err1, res1) => {
//           if (err1) return console.log("The API returned an error: " + err1);
//           const files = res1.data.files;
//           if (files.length) {
//             console.log("Files:");
//             files.map((file) => {
//               console.log(`${file.name} (${file.id})`);
//             });
//           } else {
//             console.log("No files found.");
//           }
//         }
//       );
//     }
//   }
// }

// async function main() {
//   const server = http
//     .createServer(async function (req, res) {
//       console.log("req.url: ", req.url);
//       // Example on redirecting user to Google's OAuth 2.0 server.
//       if (req.url == "/") {
//         res.writeHead(301, { Location: authorizationUrl });
//       }

//       // Receive the callback from Google's OAuth 2.0 server.
//       if (req.url.startsWith("/oauth2callback")) {
//         // Handle the OAuth 2.0 server response
//         let q = url.parse(req.url, true).query.code;

//         if (q.error) {
//           // An error response e.g. error=access_denied
//           console.log("Error:" + q.error);
//         } else {
//           // Get access and refresh tokens (if access_type is offline)
//           let { tokens } = await oauth2Client.getToken(q);
//           oauth2Client.setCredentials(tokens);

//           /** Save credential to the global variable in case access token was refreshed.
//            * ACTION ITEM: In a production app, you likely want to save the refresh token
//            *              in a secure persistent database instead. */
//           userCredential = tokens;

//           console.log(userCredential);
//           // Example of using Google Drive API to list filenames in user's Drive.
//           const drive = google.drive("v3");
//           drive.files.list(
//             {
//               auth: oauth2Client,
//               pageSize: 10,
//               fields: "nextPageToken, files(id, name)",
//             },
//             (err1, res1) => {
//               if (err1)
//                 return console.log("The API returned an error: " + err1);
//               const files = res1.data.files;
//               if (files.length) {
//                 console.log("Files:");
//                 files.map((file) => {
//                   console.log(`${file.name} (${file.id})`);
//                 });
//               } else {
//                 console.log("No files found.");
//               }
//             }
//           );
//         }
//       }

//       // Example on revoking a token
//       if (req.url == "/revoke") {
//         // Build the string for the POST request
//         let postData = "token=" + userCredential.access_token;

//         // Options for POST request to Google's OAuth 2.0 server to revoke a token
//         let postOptions = {
//           host: "oauth2.googleapis.com",
//           port: "443",
//           path: "/revoke",
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Content-Length": Buffer.byteLength(postData),
//           },
//         };

//         // Set up the request
//         const postReq = https.request(postOptions, function (res) {
//           res.setEncoding("utf8");
//           res.on("data", (d) => {
//             console.log("Response: " + d);
//           });
//         });

//         postReq.on("error", (error) => {
//           console.log(error);
//         });

//         // Post the request with data
//         postReq.write(postData);
//         postReq.end();
//       }
//       res.end();
//     })
//     .listen(80);
// }
// main().catch(console.error);

module.exports = { authorizationUrl, getToken };
