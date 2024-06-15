import express from 'express';
import { UserControllers } from './user.controller';
import { authValidation } from '../auth/auth.validation';
import { authController } from '../auth/auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);

//login
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser
);

export const UserRoutes = router;