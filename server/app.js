const express = require("express");
const path = require("path");
const cors = require("cors");
const NotFoundError = require("./ExpressError");
const authRoutes = require("./routes/auth");
const calendarRoutes = require("./routes/calendar");

const app = express();

// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);

// app.use((req, res, next) => {
//   return next(new NotFoundError("Page not found"));
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  console.error(err.stack);

  return res.status(status).json({ error: { message, status } });
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

module.exports = app;
