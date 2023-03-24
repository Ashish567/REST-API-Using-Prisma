import * as dotenv from "dotenv";
dotenv.config();
import server from "./server";

server.listen(3001, () => {
  console.log("server on localhost 3001");
});
