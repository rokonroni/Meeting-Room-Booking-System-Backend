/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {

  const message = err.message;

  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: `${err.message} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleDuplicateError;