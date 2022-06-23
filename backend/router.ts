import { Application } from "express";
import userRoute from "./routes/user.routes";
import jobRoute from "./routes/job.routes";
import express from "express";

import errorMiddleware from "./middleware/error";

export default function router(app: Application) {
  app.get("/", (req, res) => {
    return res.sendStatus(200);
  });

  app.use("/user", userRoute);
  app.use("/job", jobRoute);
  app.use("/public", express.static("public"));
  app.use(errorMiddleware);
}
