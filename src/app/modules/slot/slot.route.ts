import express from 'express';
import { slotValidation } from './slot.validation';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(slotValidation.createSlotValidationSchema),
  SlotControllers.createRoom,
);

router.get('/availability', SlotControllers.getAllSlots);

export const slotRoutes = router;