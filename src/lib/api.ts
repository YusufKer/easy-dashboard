import { API_URL } from "@/config/env";

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

export async function fetchResources(endpoint: string): Promise<Resource[]> {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const result: ApiResponse<Resource[]> = await response.json();

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
    headers: {
      "Content-Type": "application/json",
    },
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
  });

  if (!response.ok) {
    throw new Error(`Failed to delete ${endpoint}`);
  }
}
