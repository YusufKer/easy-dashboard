import { API_URL } from "@/config/env";
import { authenticatedFetch } from "@/lib/api/client";
import type { ApiResponse, Resource } from "@/lib/api/types";

class ResourceRepository {
  async fetchAll(endpoint: string): Promise<Resource[]> {
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

  async fetchById<T>(endpoint: string, id: string): Promise<T> {
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

  async create(endpoint: string, name: string): Promise<Resource> {
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

  async delete(endpoint: string, id: number): Promise<void> {
    const response = await authenticatedFetch(`${API_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${endpoint}`);
    }
  }
}

export const resourceRepository = new ResourceRepository();
