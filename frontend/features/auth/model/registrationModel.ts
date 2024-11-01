import { RegisterFormData } from "./types";

export async function registerUser(formData: RegisterFormData) {
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
