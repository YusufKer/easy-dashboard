export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
}

export interface Resource {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}
