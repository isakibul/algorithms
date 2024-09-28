const express = require("express");
const routes = require("../routes");
const applyMiddleware = require("../middleware");

const app = express();
applyMiddleware(app);
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

module.exports = app;
