import { API_URL, AUTH_URL } from "@/config/env";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
}

interface Resource {
  id: number;
  name: string;
}

// Token refresh flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// Refresh the access token using the refresh token
async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${AUTH_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return null;
      }

      const result: ApiResponse<LoginResponse> = await response.json();

      if (!result.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return null;
      }

      // Store new tokens
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);

      return result.data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Helper function to make authenticated requests with automatic token refresh
async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("accessToken");

  // Add Authorization header
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(url, { ...options, headers });

  // If unauthorized, try to refresh token and retry
  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // Retry with new token
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(url, { ...options, headers });
    }
  }

  return response;
}

export async function fetchResources(endpoint: string): Promise<Resource[]> {
  const response = await authenticatedFetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const result: ApiResponse<Resource[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function fetchResourceById<T>(
  endpoint: string,
  id: string
): Promise<T> {
  const response = await authenticatedFetch(`${API_URL}/${endpoint}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function createResource(
  endpoint: string,
  name: string
): Promise<Resource> {
  const response = await authenticatedFetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ${endpoint}`);
  }

  const result: ApiResponse<Resource> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function deleteResource(endpoint: string, id: number) {
  const response = await authenticatedFetch(`${API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete ${endpoint}`);
  }
}

export async function addFlavourToProtein(
  proteinId: string,
  flavourId: number,
  price: string
): Promise<void> {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/flavours`,
    {
      method: "POST",
      body: JSON.stringify({ flavour_id: flavourId, price }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add flavour to protein");
  }

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function removeFlavourFromProtein(
  proteinId: string,
  flavourId: number
) {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/flavours`,
    {
      method: "DELETE",
      body: JSON.stringify({ flavour_id: flavourId }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete flavour from protein");
  }
}

export async function addCutToProtein(
  proteinId: string,
  cutId: number,
  price: string
): Promise<void> {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/cuts`,
    {
      method: "POST",
      body: JSON.stringify({ cut_id: cutId, price }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add cut to protein");
  }

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function removeCutFromProtein(proteinId: string, cutId: number) {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/cuts`,
    {
      method: "DELETE",
      body: JSON.stringify({ cut_id: cutId }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete cut from protein");
  }
}

export async function updateFlavourPrice(
  proteinId: string,
  flavourId: number,
  price: string
): Promise<void> {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/flavours/${flavourId}`,
    {
      method: "PUT",
      body: JSON.stringify({ price }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update flavour price");
  }

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function updateCutPrice(
  proteinId: string,
  cutId: number,
  price: string
): Promise<void> {
  const response = await authenticatedFetch(
    `${API_URL}/protein/${proteinId}/cuts/${cutId}`,
    {
      method: "PUT",
      body: JSON.stringify({ price }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update cut price");
  }

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
}

// Authentication
interface RegisterUserData {
  email: string;
  password: string;
}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export async function registerUser(
  userData: RegisterUserData
): Promise<RegisterResponse> {
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

export async function loginUser(
  credentials: LoginUserData
): Promise<LoginResponse> {
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

export async function logoutUser(): Promise<void> {
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
