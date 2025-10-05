import { Response } from "express";

interface IMeta {
  total: number;
}
interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

export const sentResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};
