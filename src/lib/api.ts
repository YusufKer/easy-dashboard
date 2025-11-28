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

export async function fetchResourceById<T>(
  endpoint: string,
  id: string
): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}/${id}`);

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

export async function addFlavourToProtein(
  proteinId: string,
  flavourId: number,
  price: string
): Promise<void> {
  const response = await fetch(`${API_URL}/protein/${proteinId}/flavours`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cut_id: cutId }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete cut from protein");
  }
}
