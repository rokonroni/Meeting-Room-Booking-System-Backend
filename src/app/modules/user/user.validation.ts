import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8), 
  phone: z.string(), 
  address: z.string(),
  role: z.enum(["user", "admin"]),
})
})
const loginInfoValidationSchema= z.object({
  body:z.object({
    email: z.string(),
    password: z.string(),
  })
})

export const userValidations = {
  createUserValidationSchema,
  loginInfoValidationSchema
};