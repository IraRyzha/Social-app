"use client";
import React, { useState } from "react";
import { loginUser } from "../model/loginModel";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/config/hooks";
import authSlice from "../model/authSlice";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      dispatch(authSlice.actions.login(result.profile));
      setFormData({
        email: "",
        password: "",
      });
      router.replace("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full bg-main-blue hover:bg-main-blue-light text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
      >
        Login
      </button>
    </form>
  );
}
