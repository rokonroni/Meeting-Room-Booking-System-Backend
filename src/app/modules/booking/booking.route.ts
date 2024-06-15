import express from 'express';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth('admin'), BookingControllers.getAllBooking);

router.put('/:id', auth('admin'), BookingControllers.updateSingleBooking);
router.delete('/:id', auth('admin'), BookingControllers.deleteSingleBooking);

export const BookingRoutes = router;