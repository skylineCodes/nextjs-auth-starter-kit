import { z } from "zod";

export const firstNameSchema = z
  .string()
  .trim()
  .min(2, { message: "First name must be at least 2 characters long" })
  .max(50, { message: "First name must be at most 50 characters long" })
  .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, apostrophes, and hyphens" });

export const lastNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Last name must be at least 2 characters long" })
  .max(50, { message: "Last name must be at most 50 characters long" })
  .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, apostrophes, and hyphens" });

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^(?:\+234\d{10}|0\d{10})$/,
    { message: "Please enter a valid Nigerian phone number" }
  )
  .transform((val) => {
    if (val.startsWith("0")) {
      return "+234" + val.slice(1);
    }
    return val;
  });

export const emailSchema = z.string().trim().email({ message: "Your email doesn't look right" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be at most 100 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const emailLoginSchema = z
  .string()
  .min(1, { message: "Email is required" });

export const otpSchema = z
  .string()
  .min(1, { message: "OTP is required" });

export const passwordLoginSchema = z
  .string()
  .min(1, { message: "Password is required" });
