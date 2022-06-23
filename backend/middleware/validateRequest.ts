import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import ErrorHandler from "../utils/errorHandler.utils";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.log(e);
      return next(new ErrorHandler(e.errors[0].message, 400));
    }
  };

export default validate;
