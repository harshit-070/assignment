import express from "express";
import { createUserSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";
const router = express.Router();

router.post("/signin", [validateRequest(createUserSchema)], createUserHandler);
router.post(
  "/login",
  [validateRequest(createSessionSchema)],
  createUserSessionHandler
);

export default router;
