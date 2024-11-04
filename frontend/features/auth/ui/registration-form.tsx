import React, { useState } from "react";
import { registerUser } from "../model/registrationModel";
import { RegisterFormData } from "../model/types";
import { useAuth } from "@/config/AuthProvider";

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const { login, setProfile } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      console.log("User registered:", result);
      console.log(result.profile);
      setProfile(result.profile);
      window.alert("User registered");
      setFormData({
        username: "",
        email: "",
        password: "",
        bio: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      window.alert("Registration failed");
    }
    login();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:borders-main-blue focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Bio</span>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-main-blue focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-main-blue hover:bg-main-blue-light text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
      >
        Register
      </button>
    </form>
  );
}
