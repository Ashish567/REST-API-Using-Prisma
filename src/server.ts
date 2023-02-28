import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
const cookieParser = require("cookie-parser");
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// server.use((req, res, next) => {
//   req.secret = "SECRET";
//   next();
// });

// const customLogger = (message) => (req, res, next) => {
//   console.log(`Hello from ${message}`);
//   next();
// };
// server.use(customLogger("CUSTOM_LOGGER"));
//  COMPOSE MIDDLEWARE NPM
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server!" });
});

server.use("/api", protect, router);
server.use("/user", createNewUser);
server.use("/signin", signin);

export default server;
