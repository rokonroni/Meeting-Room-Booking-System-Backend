import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result =
    await UserServices.createUserIntoDB(req.body);

    const transformedResult = {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
    phone: result?.phone, 
    role: result?.role,
    address: result?.address,
  };

  sendResponse(res,
  {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: transformedResult,
  });
});


export const UserControllers = {
  createUser, 
};
