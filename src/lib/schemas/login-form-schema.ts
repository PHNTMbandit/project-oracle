import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
