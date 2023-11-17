const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "148262442616-sio7d352losu4ans24rkbmgqs6sad0qf.apps.googleusercontent.com"
);

module.exports = async function retriveGoogleInfo(idToken) {
  //   // Fetch Google's OpenID Connect Discovery document to get the public key
  //   return fetch("https://accounts.google.com/.well-known/openid-configuration")
  //     .then((response) => response.json())
  //     .then((openIdConfig) => {
  //       const jwksUri = openIdConfig.jwks_uri;

  //       // Fetch the JSON Web Key Set (JWKS) from the jwks_uri
  //       return fetch(jwksUri);
  //     })
  //     .then((response) => response.json())
  //     .then((jwks) => {
  //       const publicKey = jwks.keys[0].x5c[0];

  //       // Verify and decode the id_token using the fetched public key
  //       jwt.verify(idToken, publicKey, (err, decoded) => {
  //         if (err) {
  //           console.error("Error decoding id_token:", err);
  //         } else {
  //           console.log("Decoded id_token:", decoded);
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching public key:", error);
  //     });

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience:
      "148262442616-sio7d352losu4ans24rkbmgqs6sad0qf.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return payload;
};
