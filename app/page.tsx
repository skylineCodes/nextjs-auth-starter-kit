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
    <div className='w-full'>
      <div className="flex justify-center items-start max-w-[50vw] mx-auto bg-transparent h-[100vh] mb-[50px]">
        <div className="flex flex-col justify-center items-center gap-[16px] mt-[5rem] w-[30vw]">
          <Image src={UIButterLogo} alt="uiButter" className='h-[50px] w-[150px]' />

          <div className="flex flex-col justify-center items-center mt-[40px] gap-[15px]">
            <h2 className='text-[22px] font-semibold leading-[35px]'>Welcome back</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 sm:w-full md:w-full lg:w-full">
            <div className="bg-transparent relative rounded-[16px] flex flex-col gap-6 items-center sm:w-full md:w-full lg:w-full py-[14px] text-sm">
              <div className="items-center gap-3 sm:w-full md:w-full lg:w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="h-[50px] mt-[5px] sm:w-full md:w-full lg:w-full"
                  onChange={handleEmailChange}
                />
                {emailValidation && (
                  <p
                    className={`flex items-center gap-2 text-sm mt-[10px] ${
                      emailValidation.valid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {emailValidation.valid ? <ThumbsUp size={16} /> : <SadFace size={16} />}
                    {emailValidation.message}
                  </p>
                )}
              </div>
              <div className="sm:w-full md:w-full lg:w-full items-center gap-3">
                <Label htmlFor="password">Password</Label>
                 <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="*****"
                    className="h-[50px] sm:w-full md:w-full lg:w-full"
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
                    className={`flex items-center gap-2 text-sm mt-[10px] ${
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
              className="flex justify-center items-center gap-3 sm:w-full md:w-full lg:w-full h-[50px] border border-[#7800C2] bg-[#7800C2] px-[16px] py-[10px] rounded-xl cursor-pointer text-white hover:bg-white hover:text-[#7800C2]"
            >
              <span className='font-semibold text-[18px] leading-[100%]'>Sign In</span>
              <span>
                <MdOutlineArrowRightAlt className="h-6 w-6" />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
