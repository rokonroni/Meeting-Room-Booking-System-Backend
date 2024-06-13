
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

const createRoom = catchAsync(async (req, res) => {
  const { room, date, startTime, endTime } = req.body;
  const slotDuration = 60;
  const result = await SlotServices.createSlotIntoDB(
    room,
    date,
    startTime,
    endTime,
    slotDuration,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);


  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  }
});

export const SlotControllers = {
  createRoom,
  getAllSlots,
};