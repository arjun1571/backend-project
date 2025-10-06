import z from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 chars, include uppercase, lowercase, number & special char",
  }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number format" })
    .optional(),
  address: z.string().optional(),
});
