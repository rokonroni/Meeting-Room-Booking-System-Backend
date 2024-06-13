import { z } from "zod";

const createSlotValidationSchema = z.object({
body: z.object({
  room: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.boolean(),
})
})

export const SlotValidations = {
    createSlotValidationSchema
}