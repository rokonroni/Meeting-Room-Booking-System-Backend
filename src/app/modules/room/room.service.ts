import httpStatus from 'http-status';
import { TRoom } from './room.interface';
import Room from './room.model';
import AppError from '../../errors/AppError';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = Room.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const updateSingleRoomFromDB = async (id: string, payload: Partial<TRoom>) => {
  const isRoomExist = await Room.findById(id);

  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const { amenities } = payload;

  if (amenities && amenities.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'amenities should not be null');
  }

  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleRoomFromDB = async (id: string) => {
  const isRoomExist = await Room.findById(id);

  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateSingleRoomFromDB,
  deleteSingleRoomFromDB,
};