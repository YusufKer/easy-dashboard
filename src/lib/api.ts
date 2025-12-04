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

// Helper function to get authorization headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function fetchResources(endpoint: string): Promise<Resource[]> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: getAuthHeaders(),
  });

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
  const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
    headers: getAuthHeaders(),
  });

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
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(),
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
  const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
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
  const response = await fetch(`${API_URL}/protein/${proteinId}/flavours`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ flavour_id: flavourId, price }),
  });

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
  const response = await fetch(`${API_URL}/protein/${proteinId}/flavours`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ flavour_id: flavourId }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete flavour from protein");
  }
}

export async function addCutToProtein(
  proteinId: string,
  cutId: number,
  price: string
): Promise<void> {
  const response = await fetch(`${API_URL}/protein/${proteinId}/cuts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ cut_id: cutId, price }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cut to protein");
  }

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function removeCutFromProtein(proteinId: string, cutId: number) {
  const response = await fetch(`${API_URL}/protein/${proteinId}/cuts`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ cut_id: cutId }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete cut from protein");
  }
}

export async function updateFlavourPrice(
  proteinId: string,
  flavourId: number,
  price: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/protein/${proteinId}/flavours/${flavourId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
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
  const response = await fetch(
    `${API_URL}/protein/${proteinId}/cuts/${cutId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
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
