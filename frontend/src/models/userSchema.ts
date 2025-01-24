import z from 'zod'

const userSchema = z.object({
  name: z
  .string()
  .trim()
  .min(3)
  .max(32)
  .refine((val) => !val.toLowerCase().startsWith('qwe'), {
    message: 'forbidden prefix',
  }),
  email: z
  .string()
  .email('invalid email')
  .refine((val) => !val.toLowerCase().startsWith('admin'), {
    message: 'admin is not allowed',
  })
  .refine((val) => !val.endsWith('.ru'), {
    message: 'forbidden domain',
  }),
  password: z
  .string()
  .min(4)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, {
    message: 'include numbers & capital letters',
  }),
})