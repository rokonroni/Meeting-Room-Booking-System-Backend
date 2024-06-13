
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingsFromDB();


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
      message: 'All bookings retrieved successfully',
      data: result,
    });
  }
});

const getUserBooking = catchAsync(async (req, res) => {

  const result = await BookingServices.getUserBookingsFromDB(req.user);

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
      message: 'User bookings retrieved successfully',
      data: result,
    });
  }
});

const updateSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateSingleBookingIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteSingleBookingFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBooking,
  updateSingleBooking,
  deleteSingleBooking,
};