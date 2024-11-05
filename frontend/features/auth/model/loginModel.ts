import { LoginFormData } from "./types";

export async function loginUser(formData: LoginFormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    console.error(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
