import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
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
