import express from 'express';
import { RoomControllers } from './room.controller';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { roomValidations } from './room.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(roomValidations.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/', RoomControllers.getAllRooms);

router.get('/:id', RoomControllers.getSingleRoom);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(roomValidations.updateRoomValidationSchema),
  RoomControllers.updateSingleRoom,
);

router.delete('/:id', auth('admin'), RoomControllers.deleteSingleRoom);

export const meetingRoomRoute = router;