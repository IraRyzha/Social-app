import React, { useState } from "react";
import Image from "next/image";
import { registerUser } from "../model/registrationModel";
import { RegisterFormData } from "../model/types";
import { useAuth } from "@/config/AuthProvider";
import userImage from "../../../shared/images/userImage.png";
import sunImage from "../../../shared/images/sunImage.jpeg";
import sproutImage from "../../../shared/images/sproutImage.png";
import fireImage from "../../../shared/images/fireImage.jpeg";
import rainbowImage from "../../../shared/images/rainbowImage.png";

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar_name: "user",
  });
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { login, setProfile } = useAuth();

  const avatars = [
    { name: "user", image: userImage },
    { name: "sun", image: sunImage },
    { name: "sprout", image: sproutImage },
    { name: "fire", image: fireImage },
    { name: "rainbow", image: rainbowImage },
  ];

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setFormData((prev) => ({ ...prev, avatar_url: avatarUrl }));
  };

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
        avatar_name: "user",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      window.alert("Registration failed");
    }
    login();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="avatar-selection mb-4">
        <span className="text-gray-700">Choose an Avatar</span>
        <div className="flex space-x-4 mt-2">
          {avatars.map((avatar) => (
            <Image
              key={avatar.name}
              src={avatar.image}
              width={100}
              height={100}
              onClick={() => handleAvatarSelect(avatar.name)}
              className={`w-16 h-16 cursor-pointer rounded-full border-2 ${
                selectedAvatar === avatar.name
                  ? "border-main-blue"
                  : "border-gray-300"
              }`}
              alt={`${avatar.name} Avatar`}
            />
          ))}
        </div>
      </div>
      <label className="block">
        <span className="text-gray-700">Username</span>
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
