import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createBookingValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    slots: z.array(z.string()),
    user: z.string(),
    date: z.string()
      .refine((val) => dateRegex.test(val) && !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format, please use YYYY-MM-DD this formate',
      }),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};