import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  // const isPasswordMatch = await bcryptjs.compare(
  //   password as string,
  //   hashedPassword
  // );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const allUsers = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: allUsers,
    meta: {
      total: totalUsers,
    },
  };
};

export const userServices = {
  createUserService,
  getAllUsers,
};
