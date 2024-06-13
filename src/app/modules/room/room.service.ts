import { TRoom } from "./room.interface";
import Room from "./room.model";

const createRoomIntoDB = async (data: TRoom) => {
  const res = await Room.create(data);
  return res;
};

const getAllRoomsFromDB = async () => {
  const res = await Room.find();
  return res;
};

const getRoomByIdFromDB = async (id: string) => {
  const res = await Room.findById(id);
  return res;
};

export const RoomServices = {
    createRoomIntoDB,
    getAllRoomsFromDB,
    getRoomByIdFromDB,
}