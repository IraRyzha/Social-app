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
    console.error(response.json());
    return response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
