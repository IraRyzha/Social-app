interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar_name: "user" | "sun" | "sprout" | "fire" | "rainbow";
}

interface LoginFormData {
  email: string;
  password: string;
}

export type { RegisterFormData, LoginFormData };
