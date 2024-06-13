import { startSession } from 'mongoose';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import Room from '../room/room.model';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import Slot from '../slot/slot.model';

const createBookingIntoDB = async (
  payload: Omit<TBooking, 'totalAmount'>,
): Promise<TBooking> => {
  const { room, slots, user, isConfirmed, date } = payload;

  const session = await startSession();
  session.startTransaction();

  try {
    const roomInfo = await Room.findById(room).session(session);
    if (!roomInfo) {
      throw new Error('Room not found');
    }

    const isRoomDeleted = roomInfo?.isDeleted;
   
    if (isRoomDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room is deleted!');
    }

    const userInfo = await User.findOne({ _id: user, role: 'user' }).session(
      session,
    );
    if (!userInfo) {
      throw new Error('User not found');
    }

    // Check if slots array is null or empty
    if (!(slots?.length ?? false)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Slots array cannot be empty');
    }

    const slotDocuments = await Slot.find({
      _id: { $in: slots },
      room,
      isBooked: false,
    });
    if (slotDocuments.length !== slots.length) {
      throw new Error('One or more slots are already booked or do not exist');
    }

    const pricePerSlot = roomInfo.pricePerSlot;
    const totalAmount = slots.length * pricePerSlot;


    const booking = await Booking.create(
      [
        {
          room,
          date,
          slots,
          user,
          totalAmount,
          isConfirmed,
        },
      ],
      { session },
    );

    if (!booking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
    }

    const slotUpdate = await Slot.updateMany(
      { _id: { $in: slots } },
      { isBooked: true },
      { session },
    );

    if (!slotUpdate) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create update slot',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    const slotsDetail = await Promise.all(
      [...slots].map((slot) => Slot.findById(slot).exec()),
    );

    const populatedBooking = await Booking.findById(booking[0]._id)
      .populate('room')
      .populate({
        path: 'user',
        select: '-password -__v',
      })
      .exec();

    //@ts-expect-error :'populatedBooking' is possibly 'null'
    populatedBooking.slots = slotsDetail;

    return populatedBooking as TBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
  }
};

const getBookingsFromDB = async () => {
  const bookings = await Booking.find()
    .populate('room')
    .populate({
      path: 'user',
      select: '-password -__v',
    })
    .exec();

  const populatedBookings = await Promise.all(
    bookings.map(async (booking) => {
      const detailedSlots = await Promise.all(
        booking.slots.map((slotId) => Slot.findById(slotId).exec()),
      );

      return {
        ...booking.toObject(),
        slots: detailedSlots,
      };
    }),
  );

  return populatedBookings;
};

const getUserBookingsFromDB = async (payload: JwtPayload) => {
  const userExist = await User.findOne({ email: payload?.email });

  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const bookings = await Booking.find({ user: userExist._id })
    .populate('room')
    .select('-user -__v')
    .exec();

  const populatedBookings = await Promise.all(
    bookings.map(async (booking) => {
      const detailedSlots = await Promise.all(
        booking.slots.map((slotId) => Slot.findById(slotId).exec()),
      );

      return {
        ...booking.toObject(),
        slots: detailedSlots,
      };
    }),
  );

  return populatedBookings;
};

const updateSingleBookingIntoDB = async (id: string) => {
  const isBookingExist = await Booking.findById(id);

  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  //checking isDeleted or not
  const isDeletedBooking = isBookingExist?.isDeleted;

  if (isDeletedBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking is already deleted');
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed: 'confirmed' },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteSingleBookingFromDB = async (id: string) => {
  const isBookingExist = await Booking.findById(id);

  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  getUserBookingsFromDB,
  updateSingleBookingIntoDB,
  deleteSingleBookingFromDB,
};