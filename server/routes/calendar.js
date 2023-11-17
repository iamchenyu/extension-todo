const express = require("express");
const { oauth2Client } = require("../googleAuth/getAuthUrl");
const { google } = require("googleapis");

const route = express.Router();
// Create a new instance of the Google Calendar API
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

route.get("/", async (req, res) => {
  // for local development
  oauth2Client.setCredentials({
    access_token:
      "ya29.a0AfB_byBb71G2EfKm1YqtyIsMnpQ98rL-5a1w47VZnFufV93MwuRvBvLoliLOTpYk5OlQwOZApGREYtZ_FZLVw4LxW1Xa5uZm2BxDTAem9GjInPooGrySb-iCS7Ipjrb2U6WesvKjaz63w_7v5p5yQFlJKGqHg1fbIty7aCgYKAXISARESFQHGX2MiMZTR5H7H-2nfjAIIfIQtXA0171",
    refresh_token:
      "1//05Xo_DrkkAudSCgYIARAAGAUSNwF-L9Irq1SrIGu8BjBDzEazAqr09j0Tn1k_wGAnTHySsmgsM7HkW7k6brAbzucMn1iiEXxC3J0",
    // Token expiry date (optional)
    expiry_date: true,
  });

  // Retrieve the user's events
  calendar.events.list(
    {
      calendarId: "primary", // 'primary' is the default calendar for the authenticated user
      timeMin: new Date().toISOString(),
      maxResults: 10, // You can adjust this number as needed
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.error("The API returned an error:", err.message);

      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming events:");
        events.forEach((event) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
});

module.exports = route;
