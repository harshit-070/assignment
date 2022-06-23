import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import catchAsync from "../middleware/catchAsync";
import User from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import ErrorHandler from "../utils/errorHandler.utils";

export const createUserHandler = catchAsync(
  async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({
      email,
    });
    if (user) {
      return next(new ErrorHandler("Email already exists", 401));
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    return res.json({
      user: omit(newUser.toJSON(), "password"),
      success: true,
    });
  }
);
