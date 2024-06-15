import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid room ID format'),
    date: z
      .string()
      .refine(
        (val) => dateRegex.test(val) && !isNaN(new Date(val).getTime()),
        {
          message: 'Invalid date format, please use YYYY-MM-DD',
        },
      ),
    startTime: z.string().refine(
      (val) => {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val);
      },
      {
        message: 'Invalid start time format',
      },
    ),
    endTime: z.string().refine(
      (val) => {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val);
      },
      {
        message: 'Invalid end time format',
      },
    ),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(':').map(Number);
      const [endHour, endMinute] = data.endTime.split(':').map(Number);
      return (
        startHour < endHour ||
        (startHour === endHour && startMinute < endMinute)
      );
    },
    {
      message: 'Start time must be before end time',
      path: ['startTime'],
    },
  ),
});

export const slotValidation = {
  createSlotValidationSchema,
};