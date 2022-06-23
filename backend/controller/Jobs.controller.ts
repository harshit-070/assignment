import { NextFunction, Request, Response } from "express";
import catchAsync from "../middleware/catchAsync";
import JobModel from "../model/Job.model";
import {
  applyJobInput,
  CreateJobInput,
  viewJobInput,
} from "../schema/jobs.schema";
import ErrorHandler from "../utils/errorHandler.utils";

export const createJobHandler = catchAsync(
  async (
    req: Request<{}, {}, CreateJobInput>,
    res: Response,
    next: NextFunction
  ) => {
    const user = res.locals.user._id;

    const newJob = await JobModel.create({ ...req.body, issuedBy: user });
    return res.json({ success: true, message: "Job Posted" });
  }
);

export const getMyPostedJobs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user._id;
    const jobs = await JobModel.find({ issuedBy: user }).select({ title: 1 });
    return res.json({ success: true, jobs });
  }
);

export const viewJobsList = catchAsync(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const page = req.query.page;
    const numberOfJobsPerPage = 10;
    const jobList = await JobModel.find({})
      .populate({
        path: "issuedBy",
        select: "name",
      })
      .select("-applicants");

    return res.status(200).json({
      success: true,
      jobs: jobList,
    });
  }
);

export const viewJob = catchAsync(
  async (
    req: Request<viewJobInput, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const _id = req.params.id;
    const job = await JobModel.findById(_id).populate({
      path: "issuedBy",
      select: "name",
    });

    if (!job) {
      return next(new ErrorHandler("Job not found", 404));
    }

    return res.status(200).json({
      success: true,
      job,
    });
  }
);

export const applyJob = catchAsync(
  async (
    req: Request<applyJobInput, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const user = res.locals.user._id;
    const jobId = req.params.id;

    const job = await JobModel.findOne({
      _id: jobId,
      applicants: { $elemMatch: { user: user } },
    });

    if (job) {
      return next(new ErrorHandler("Already Applied", 409));
    }

    const updatedJob = await JobModel.updateOne(
      { _id: jobId },
      {
        $inc: { numberOfApplicants: 1 },
        $push: { applicants: { user, resume: req.file?.filename } },
      }
    );

    if (updatedJob.modifiedCount == 1) {
      return res.status(200).json({ success: true, message: "Applied" });
    }
    return next(new ErrorHandler("Invalid JobId", 404));
  }
);

export const getResponse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user._id;
    const id = req.params.id;

    const job = await JobModel.findOne({ _id: id, issuedBy: user }).populate({
      path: "applicants.user",
      select: "name",
    });
    return res.json({ success: true, job });
  }
);

// export const view
