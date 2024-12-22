import { PostFormData } from "./types";

export async function createPost(formData: PostFormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    console.log("function createPost response");
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
