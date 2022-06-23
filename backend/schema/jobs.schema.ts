import { isValidObjectId } from "mongoose";
import { date, number, object, string, TypeOf } from "zod";
import currentCode from "../utils/currencyCode";

export const createJobSchema = object({
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }),
    stipend: object({
      min: number().min(0, "Stipend Cannot be negative"),
      max: number().min(0, "Stipend Cannot be negative"),
    }),
    opening: number().min(
      1,
      "Minimum number of opening should be greater than 1"
    ),
    duration: number().min(
      1,
      "Minimum number of months must be greater than 1"
    ),
    date: string({ required_error: "Date is required" }),
    skills: string().array(),
  }).refine(
    ({ stipend: { min, max } }) => max >= min,
    "Max Stipend must be greater than min stipend"
  ),
});

export const viewJobSchema = object({
  params: object({
    id: string({ required_error: "Id is required" }),
  }).refine(({ id }) => isValidObjectId(id), "Invalid Job Id"),
});

export const applyJobSchema = object({
  params: object({
    id: string({ required_error: "JobId is required" }),
  }).refine(({ id }) => isValidObjectId(id), "Enter a valid ID"),
});

export type CreateJobInput = TypeOf<typeof createJobSchema>["body"];
export type viewJobInput = TypeOf<typeof viewJobSchema>["params"];
export type applyJobInput = TypeOf<typeof applyJobSchema>["params"];
