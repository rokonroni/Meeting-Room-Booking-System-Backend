import { RequestHandler, Response } from "express";
import httpStatus from "http-status";

type TResponse<T> = {
  success: boolean, 
  statusCode: number, 
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;