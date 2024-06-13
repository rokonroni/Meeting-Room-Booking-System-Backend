import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { TLoginUser } from './auth.interface';

import config from '../../config';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { createToken } from './auth.utils';

const loginUserFromDB = async (payload: TLoginUser) => {
 
  const userData = await User.findOne({ email: payload?.email });
  
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  //access granted ---->login
  //create token and sent to the client

  const jwtPayload = {
    email: userData?.email,
    role: userData?.role,
  };

//   console.log(jwtPayload, 'jwtPayload');

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, userData };
};

export const AuthServices = {
  loginUserFromDB,
};