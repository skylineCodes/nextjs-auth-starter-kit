'use client';

import { z } from "zod";
import zxcvbn from "zxcvbn";
import { toast } from "sonner";
import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { loginSchema } from "@/lib/validation";
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Infer TypeScript type from Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const score = zxcvbn(passwordValue).score;

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status !== 200) {
        const err = await res.json();
        toast.error(err.message || "Login failed");
        return;
      }

      const result = await res.json();
      console.log("✅ login:", result);

      toast.success(result?.message);

      // ⏩ Redirect user to login page
      router.push("/dashboard");
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
          <h2 className="text-2xl font-semibold leading-8">Welcome back! 🤗</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-6 w-full"
        >
          <div className="bg-transparent relative rounded-lg flex flex-col gap-6 w-full py-4 text-sm">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="h-12 w-full"
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              ) : null}
            </div>

            {/* <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="*****"
                  className="h-12 w-full"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password ? (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              ) : null}
            </div> */}

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="*****"
                  className="h-12 w-full"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot Password link */}
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#7800C2] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Validation error */}
              {errors.password ? (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              ) : null}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center gap-3 cursor-pointer w-full h-12 border border-[#7800C2] bg-[#7800C2] rounded-lg text-white hover:bg-white hover:text-[#7800C2]"
          >
            <span className="font-semibold text-lg">{isSubmitting ? "Signing In..." : "Sign In"}</span>
            <MdOutlineArrowRightAlt className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
