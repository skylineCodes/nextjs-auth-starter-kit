import { z } from "zod";
import {
  firstNameSchema,
  lastNameSchema,
  phoneSchema,
  emailSchema,
  passwordSchema,
  emailLoginSchema,
  passwordLoginSchema,
  otpSchema,
} from "./user.schema";

// Signup Schema
export const signupSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login Schema
export const loginSchema = z.object({
  email: emailLoginSchema,
  password: passwordLoginSchema,
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailLoginSchema,
});

// Send Email Schema
export const sendEmailSchema = z.object({
  otp: otpSchema,
  newPassword: passwordLoginSchema,
});
