import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user.model";

export interface JobInput {
  title: string;
  description: string;
  issuedBy: UserDocument["_id"];
  skills: string[];
  stipend: {
    min: Number;
    max: Number;
  };
  duration: Number;
  opening: Number;
  date: Date;
}

export interface JobDocument extends Document, JobInput {
  numberOfApplicants: number;
  applicants: UserDocument["_id"][];
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stipend: {
    min: { type: Number },
    max: { type: Number },
  },
  duration: { type: Number, default: 1 },
  opening: { type: Number, default: 1 },
  date: { type: Date },
  issuedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  skills: [{ type: String }],
  numberOfApplicants: { type: Number, default: 0 },
  applicants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      resume: { type: String },
    },
  ],
});

const JobModel = model("Job", JobSchema);

export default JobModel;
