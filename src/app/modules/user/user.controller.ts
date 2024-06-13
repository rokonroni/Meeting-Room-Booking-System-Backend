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



const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  // const { refreshToken, accessToken, needsPasswordChange } = result;

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });
   const transformedResult = {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
    phone: result?.phone, 
    role: result?.role,
    address: result?.address,
  };

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: "Token", 
    data: transformedResult,
  });
});


export const UserControllers = {
  createUser, loginUser
};
