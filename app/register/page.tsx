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
import { signupSchema } from "@/lib/validation";
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Infer TypeScript type from Zod schema
type RegisterFormValues = z.infer<typeof signupSchema>;

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const score = zxcvbn(passwordValue).score;

  const [serverError, setServerError] = useState<string | null>(null);

  const strengthLabels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        // setServerError(err.message || "Registration failed");
        toast.error(err.message || "Registration failed");
        return;
      }

      const result = await res.json();
      console.log("✅ Registered:", result);

      toast.success("Account created successfully! Please login.");

      // ⏩ Redirect user to login page
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error('Failed to create account. Please try again.')
      // setServerError("Unexpected error. Please try again.");
    }
  };

  return (
   <div className="w-full min-h-screen flex justify-center items-start bg-transparent py-10 px-4">
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md">
        {/* <Image src={UIButterLogo} alt="uiButter" className="h-12 w-auto" /> */}

        <div className="flex flex-col justify-center items-center mt-6 gap-3 text-center">
          <h2 className="text-2xl font-semibold leading-8">Create new account</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-6 w-full"
        >
          <div className="bg-transparent relative rounded-lg flex flex-col gap-6 w-full py-4 text-sm">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  type="text"
                  id="first_name"
                  placeholder="Enter your first name"
                  className="h-12 w-full"
                  {...register("firstName")}
                />
                {register("firstName") && errors.firstName ? (
                  <p className="text-red-600 text-sm">{errors.firstName.message}</p>
                ) : (
                  <p className="text-green-600 text-sm">Looks good</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  type="text"
                  id="last_name"
                  placeholder="Enter your last name"
                  className="h-12 w-full"
                  {...register("lastName")}
                />
                {errors.lastName ? (
                  <p className="text-red-600 text-sm">{errors.lastName.message}</p>
                ) : (
                  <p className="text-green-600 text-sm">Looks good</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="phone">Phone No</Label>
              <Input
                type="text"
                id="phone"
                placeholder="Enter your phone no"
                className="h-12 w-full"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              ) : (
                <p className="text-green-600 text-sm">Looks good</p>
              )}
            </div>
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
              ) : (
                <p className="text-green-600 text-sm">Looks good</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="*****"
                  className="h-12 w-full"
                  {...register("password")}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Validation error or strength feedback */}
              {errors.password ? (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              ) : passwordValue ? (
                <div className="flex flex-col gap-1">
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                      className={`h-2 rounded transition-all ${strengthColors[score]}`}
                      style={{ width: `${(score + 1) * 20}%` }}
                    />
                  </div>
                  {/* Strength label */}
                  <p className={`text-sm ${strengthColors[score].replace("bg-", "text-")}`}>
                    {strengthLabels[score]}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center gap-3 cursor-pointer w-full h-12 border border-[#7800C2] bg-[#7800C2] rounded-lg text-white hover:bg-white hover:text-[#7800C2]"
          >
            <span className="font-semibold text-lg">{isSubmitting ? "Registering..." : "Register"}</span>
            <MdOutlineArrowRightAlt className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register;
