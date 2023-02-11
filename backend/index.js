require("dotenv").config();
const express = require("express");
const app = express();

require("./start/cors")(app);
require("./routes/routes")(app);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
