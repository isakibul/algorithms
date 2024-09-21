require("dotenv").config();
const http = require("http");
const app = require("./src/app/app");
const { connectDatabase } = require("./src/db");

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDatabase();
    server.listen(port, () => {
      console.log(
        `Server is running on port ${port} - ${new Date().toISOString()}`
      );
    });
  } catch (error) {
    console.log("Database error");
    console.log(error);
  }
};

main();
