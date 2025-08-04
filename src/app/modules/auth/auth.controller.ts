/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

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
