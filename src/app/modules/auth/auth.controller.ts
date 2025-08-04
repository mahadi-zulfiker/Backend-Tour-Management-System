/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";
import AppError from "../../errprHelpers/AppError";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("refreshToken", loginInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User Login Succesfull",
      data: loginInfo,
      success: true,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing");
    }

    const tokenInfo = await AuthService.getNewAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "User Login Succesfull",
      data: tokenInfo,
      success: true,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
};
