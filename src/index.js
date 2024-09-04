require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDatabase } = require("./db");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    connectDatabase();
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (e) {
    console.log("Database error");
    console.log(e);
  }
};

main();
