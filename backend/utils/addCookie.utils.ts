import { Response } from "express";
import config from "config";

export const addAccessToken = (token: string, res: Response) => {
  const COKKIE_EXPIRE: number = parseInt(config.get("accessTokenTtl")!);
  const options = {
    expires: new Date(Date.now() + COKKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("accessToken", token, options);
};

export const addRefreshTokens = (token: string, res: Response) => {
  const COKKIE_EXPIRE: number = parseInt(config.get("refreshTokenTtl")!);
  const options = {
    expires: new Date(Date.now() + COKKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("refreshToken", token, options);
};
