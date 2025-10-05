import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({ name, email });
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
