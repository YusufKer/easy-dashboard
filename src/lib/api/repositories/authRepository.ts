import { AUTH_URL } from "@/config/env";
import type {
  ApiResponse,
  RegisterUserData,
  RegisterResponse,
  LoginUserData,
  LoginResponse,
} from "@/lib/api/types";

class AuthRepository {
  async register(userData: RegisterUserData): Promise<RegisterResponse> {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to register user");
    }

    const result: ApiResponse<RegisterResponse> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  }

  async login(credentials: LoginUserData): Promise<LoginResponse> {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to login");
    }

    const result: ApiResponse<LoginResponse> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return;
    }

    try {
      await fetch(`${AUTH_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Always clear local storage regardless of API response
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }
}

export const authRepository = new AuthRepository();
