import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BookingControllers } from '../modules/booking/booking.controller';
import { RoomRoutes } from '../modules/room/room.route';
import { slotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { auth } from '../middlewares/auth';

const router = express.Router();

const modeuleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

router.get('/my-bookings', auth('user'), BookingControllers.getUserBooking);

modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;