import { RegisterFormData } from "./types";

export async function registerUser(formData: RegisterFormData) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
