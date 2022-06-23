import express from "express";
import config from "config";
import log from "./logger";
import { connect } from "./db/connect";
import router from "./router";
import deserializeUser from "./middleware/deserializeUser";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
const app = express();

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "../public")));
  console.log("Hi");
  app.get("/", (req, res) => {
    res.redirect("/login");
  });
}

const host = config.get("host") as string;
const port = config.get("port") as number;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);

app.listen(port, host, () => {
  log.info(`Listening on http://${host}:${port}`);
  connect();
  router(app);
});
