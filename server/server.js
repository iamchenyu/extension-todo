const mongoose = require("mongoose");
const app = require("./app");
const { PORT, MONGO_URL } = require("./config");

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true, // deprecated
    // useUnifiedTopology: true // deprecated
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Clients Tracker App is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} - did not connect`));
