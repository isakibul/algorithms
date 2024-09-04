const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "Ok",
    user: req.user,
  });
});

module.exports = app;
