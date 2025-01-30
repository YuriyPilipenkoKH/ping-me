import { signUpSchema } from "./signUpSchema";
import z from 'zod'


// Create loginSchema by picking fields from signUpSchema
export const loginSchema = signUpSchema.pick({
  email: true,
  password: true,
});

// Infer the type of loginSchema
export type LoginSchemaType = z.infer<typeof loginSchema>;