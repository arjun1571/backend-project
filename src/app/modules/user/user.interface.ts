import { Types } from "mongoose";

export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}
export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: isActive;
  isVerified?: boolean;
  roles: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
