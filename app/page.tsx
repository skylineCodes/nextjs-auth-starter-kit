'use client';

import { z } from "zod";
import { toast } from "sonner"
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { Eye, EyeOff, ThumbsUp } from "lucide-react";
import SadFace from '../assets/icons/sad-face.svg';
import UIButterLogo from '../assets/images/uiButterLogo.png';

const emailSchema = z.string().email({ message: "Your email doesn't look right" });
const passwordSchema = z.string().min(1, { message: "Please enter your password" });

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailValidation, setEmailValidation] = useState<null | { valid: boolean; message: string }>(null);
  const [passwordValidation, setPasswordValidation] = useState<null | { valid: boolean; message: string }>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value); 

    const result = emailSchema.safeParse(value);

    if (!result.success) {
      setEmailValidation({ valid: false, message: result.error.issues[0].message });
    } else {
      setEmailValidation({ valid: true, message: "Looks good" });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    const result = passwordSchema.safeParse(value);

    if (!result.success) {
      setPasswordValidation({ valid: false, message: result.error.issues[0].message });
    } else {
      setPasswordValidation({ valid: true, message: "Looks good" });
    }
  }; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Final validation check before submitting
    const emailResult = emailSchema.safeParse(email);
    const passwordResult = passwordSchema.safeParse(password);

    if (!emailResult.success) {
      setEmailValidation({ valid: false, message: emailResult.error.issues[0].message });
      return;
    }
    if (!passwordResult.success) {
      setPasswordValidation({ valid: false, message: passwordResult.error.issues[0].message });
      return;
    }

    // 🚀 Dummy credentials
    const dummyEmail = "admin@uibutter.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
      toast.success('Login successful!')

      // ✅ Redirect to dashboard
      router.push("/dashboard");
    } else {
      toast.error('Invalid email or password. Please try again.')
    }
  };

  return (
   <div className="w-full min-h-screen flex justify-center items-start bg-transparent py-10 px-4">
    <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md">
      <Image src={UIButterLogo} alt="uiButter" className="h-12 w-auto" />

      <div className="flex flex-col justify-center items-center mt-6 gap-3 text-center">
        <h2 className="text-2xl font-semibold leading-8">Welcome back</h2>
      </div>

      <form
        onSubmit={handleSubmit}
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
              onChange={handleEmailChange}
            />
            {emailValidation && (
              <p
                className={`flex items-center gap-2 text-sm mt-2 ${
                  emailValidation.valid ? "text-green-600" : "text-red-600"
                }`}
              >
                {emailValidation.valid ? <ThumbsUp size={16} /> : <SadFace size={16} />}
                {emailValidation.message}
              </p>
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
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordValidation && (
              <p
                className={`flex items-center gap-2 text-sm mt-2 ${
                  passwordValidation.valid ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordValidation.valid ? <ThumbsUp size={16} /> : <SadFace size={16} />}
                {passwordValidation.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="flex justify-center items-center gap-3 w-full h-12 border border-[#7800C2] bg-[#7800C2] rounded-lg text-white hover:bg-white hover:text-[#7800C2]"
        >
          <span className="font-semibold text-lg">Sign In</span>
          <MdOutlineArrowRightAlt className="h-6 w-6" />
        </Button>
      </form>
    </div>
  </div>

  )
}

export default Login
