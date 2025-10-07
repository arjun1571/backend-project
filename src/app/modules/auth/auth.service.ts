import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const credentialsWithLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    userExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }
  const jwtPayload = {
    userId: userExist._id,
    email: userExist.email,
    role: userExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_SECRET_EXPIRES_IN
  );
  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsWithLogin,
};
