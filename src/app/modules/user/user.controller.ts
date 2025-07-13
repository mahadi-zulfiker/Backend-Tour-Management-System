/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new Error("Fake Error")
//     // throw new AppError(httpStatus.BAD_REQUEST, "Fake Error")
//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   message: "User Created Successfully",
    //   user,
    // });

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message : "User Created Succesfully",
        data : user,
        success : true,
        
    })
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message : "All Users Retrived Succesfully",
        data : result.data,
        success : true,
        meta : result.meta
    })
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
};

//route matching -> controller -> service -> model -> DB
