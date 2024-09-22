const express = require("express");
const routes = require("../routes");

const app = express();
app.use(express.json());

app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

module.exports = app;
