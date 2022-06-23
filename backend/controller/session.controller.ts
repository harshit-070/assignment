import config from "config";
import { NextFunction, Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession } from "../services/session.service";
import { sign } from "../utils/jwt.utils";
import { addAccessToken, addRefreshTokens } from "../utils/addCookie.utils";
import ErrorHandler from "../utils/errorHandler.utils";
import catchAsync from "../middleware/catchAsync";

export const createUserSessionHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // validate the email and password
    const user = await validatePassword(req.body);

    if (!user) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = sign(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") }
    );

    // create refresh token
    const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    addAccessToken(accessToken, res);
    addRefreshTokens(refreshToken, res);

    // send refresh & access token back
    return res.status(200).json({ success: true, user });
  }
);
