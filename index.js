const express = require("express");
const config = require("config");
const app = express();
require("./startup/router")(app);
require("./startup/prod")(app);

const mongoose = require("mongoose");
if (!config.get("jwtPrivateKey")) {
  console.error("jsonwebtoken is not define");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/parking-car")
  .then(() => console.log("connected to mongodb database"))
  .catch((err) => console.error("could not get the database", err));

const port = process.env.PORT || 4000;
app.listen(port, console.log(`listening on port ${port}.....`));
