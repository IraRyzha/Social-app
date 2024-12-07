export async function fetchUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  const data = await response.json();

  console.log("fetchUser work PROFILE: ");
  console.log(data);

  return await data;
}
