import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_GATEWAY, "Access token is missing");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(
          httpStatus.BAD_GATEWAY,
          "You are not authorized user"
        );
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(httpStatus.BAD_GATEWAY, "Not permission to access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
