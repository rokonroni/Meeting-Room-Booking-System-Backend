import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB();

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Rooms retrieved successfully",
      data: result,
    });
  }
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RoomServices.getSingleRoomFromDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Rooms retrieved successfully",
      data: result,
    });
  }
});

const updateSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RoomServices.updateSingleRoomFromDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room updated successfully",
    data: result,
  });
});

const deleteSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RoomServices.deleteSingleRoomFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
