const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Clients Tracker App is listening on PORT ${PORT}`);
});
