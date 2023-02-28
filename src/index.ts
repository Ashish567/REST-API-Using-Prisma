// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     res.end();
//   }
// });

// server.listen(3001, () => {
//   console.log("server on localhost 3001");
// });
import * as dotenv from "dotenv";
dotenv.config();
import server from "./server";

server.listen(3001, () => {
  console.log("server on localhost 3001");
});
