'use client';

import { z } from "zod";
import zxcvbn from "zxcvbn";
import { toast } from "sonner";
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { forgotPasswordSchema, sendEmailSchema } from "@/lib/validation";
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ✅ Infer TypeScript type from Zod schema
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function useResendEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ForgotPasswordFormValues) => {

      const payload = { email: data?.email };

      console.log(payload);
      console.log(JSON.stringify(data));

      const res = await fetch(`/api/auth/resend-email`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), 
      });

      if (res.status !== 200) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to resend email");
      }

      return res.json(); // return parsed JSON
    },
    onSuccess: (result) => {
      toast.success(result?.message || "Email sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["device"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
}

// ✅ Infer TypeScript type from Zod schema
type SendEmailFormValues = z.infer<typeof sendEmailSchema>;

const SendEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: any = searchParams.get("email");
  
  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate: resendEmail, isPending: isResendEmail } = useResendEmail();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SendEmailFormValues>({
    resolver: zodResolver(sendEmailSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SendEmailFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status !== 200) {
        const err = await res.json();
        toast.error(err.message);
        return;
      }

      const result = await res.json();

      toast.success(result?.message);

      // ⏩ Redirect user to login page
      router.push("/login");
    } catch (err) {
      console.log('err', err);
      toast.error('Failed to login. Please try again.');
      // setServerError("Unexpected error. Please try again.");
    }
  };

  return (
   <div className="w-full min-h-screen flex justify-center items-start bg-transparent py-10 px-4">
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md">

        <div className="flex flex-col justify-center items-center mt-6 gap-3 text-center">
          <h2 className="text-2xl font-semibold leading-8">Reset Password</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-6 w-full"
        >
          <div className="bg-transparent relative rounded-lg flex flex-col gap-6 w-full py-4 text-sm">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="otp">OTP</Label>
              <Input
                type="text"
                id="otp"
                placeholder="Enter otp"
                className="h-12 w-full"
                {...register("otp")}
              />
              {errors.otp ? (
                <p className="text-red-600 text-sm">{errors.otp.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*****"
                className="h-12 w-full"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Validation error */}
            {errors.newPassword ? (
              <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
            ) : null}

            {/* Resend OTP link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => resendEmail({ email })}
                disabled={isResendEmail}
                className="flex items-center gap-2 text-sm text-[#7800C2] hover:underline cursor-pointer disabled:opacity-50"
              >
                {isResendEmail ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center gap-3 cursor-pointer w-full h-12 border border-[#7800C2] bg-[#7800C2] rounded-lg text-white hover:bg-white hover:text-[#7800C2]"
          >
            <span className="font-semibold text-lg">{isSubmitting ? "Reseting..." : "Reset Email"}</span>
            <MdOutlineArrowRightAlt className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SendEmail;
