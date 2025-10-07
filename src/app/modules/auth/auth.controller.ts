/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sentResponse";
import { AuthServices } from "./auth.service";

const credentialsWithLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const logInInfo = await AuthServices.credentialsWithLogin(req.body);
    sentResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Lodged In Successfully",
      data: logInInfo,
    });
  }
);

export const AuthController = {
  credentialsWithLogin,
};
