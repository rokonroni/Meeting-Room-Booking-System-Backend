import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser, TLoginUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
 const result = await User.create(payload);
 return result;
};

const loginUser = async (payload: TLoginUser
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

  // checking if the user is blocked

//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

//   const jwtPayload = {
//     userId: user.email,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

//   return {
//     accessToken,
//     refreshToken,
//     needsPasswordChange: user?.needsPasswordChange,
//   };

return user; 
};

export const UserServices = {
    createUserIntoDB, 
    loginUser
}

