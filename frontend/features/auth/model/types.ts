interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  bio: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export type { RegisterFormData, LoginFormData };
