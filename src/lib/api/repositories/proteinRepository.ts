import { API_URL } from "@/config/env";
import { authenticatedFetch } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/api/types";

class ProteinRepository {
  async addFlavour(
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

  async removeFlavour(proteinId: string, flavourId: number): Promise<void> {
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

  async updateFlavourPrice(
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

  async addCut(
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

  async removeCut(proteinId: string, cutId: number): Promise<void> {
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

  async updateCutPrice(
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
}

export const proteinRepository = new ProteinRepository();
