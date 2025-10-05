import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
// import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new AppError(httpStatus.BAD_REQUEST, "This is a custom error");
    // throw new Error("This is a custom error");
    const user = await userServices.createUserService(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

export const userControllers = {
  createUser,
};
