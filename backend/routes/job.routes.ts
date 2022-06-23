import express from "express";
import {
  applyJob,
  createJobHandler,
  getMyPostedJobs,
  getResponse,
  viewJob,
  viewJobsList,
} from "../controller/Jobs.controller";
import requireCompany from "../middleware/requireCompany";
import requireUser from "../middleware/requireUser";
import validateRequest from "../middleware/validateRequest";
import { applyJobSchema, createJobSchema } from "../schema/jobs.schema";

const router = express.Router();
import multer from "multer";
import path from "path";

const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/resume"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const resumeUpload = multer({
  storage: resumeStorage,
  limits: { fileSize: 1000000 * 2 },
});

router.post(
  "/create",
  [requireCompany, validateRequest(createJobSchema)],
  createJobHandler
);

router.get("/getMyPostedJobs", [requireCompany], getMyPostedJobs);

router.get("/response/:id", [requireCompany], getResponse);

router.post(
  "/apply/:id",
  [requireUser, validateRequest(applyJobSchema), resumeUpload.single("resume")],
  applyJob
);

router.get("/view/:id", [requireUser], viewJob);

router.get("/", [requireUser], viewJobsList);

export default router;
