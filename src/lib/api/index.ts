// Export all repositories
export { authRepository } from "@/lib/api/repositories/authRepository";
export { resourceRepository } from "@/lib/api/repositories/resourceRepository";
export { proteinRepository } from "@/lib/api/repositories/proteinRepository";

// Export types
export type {
  ApiResponse,
  Resource,
  User,
  RegisterUserData,
  RegisterResponse,
  LoginUserData,
  LoginResponse,
} from "@/lib/api/types";

// Re-export legacy functions for backward compatibility
import { authRepository } from "@/lib/api/repositories/authRepository";
import { resourceRepository } from "@/lib/api/repositories/resourceRepository";
import { proteinRepository } from "@/lib/api/repositories/proteinRepository";

export const registerUser = authRepository.register.bind(authRepository);
export const loginUser = authRepository.login.bind(authRepository);
export const logoutUser = authRepository.logout.bind(authRepository);

export const fetchResources =
  resourceRepository.fetchAll.bind(resourceRepository);
export const fetchResourceById =
  resourceRepository.fetchById.bind(resourceRepository);
export const createResource =
  resourceRepository.create.bind(resourceRepository);
export const deleteResource =
  resourceRepository.delete.bind(resourceRepository);

export const addFlavourToProtein =
  proteinRepository.addFlavour.bind(proteinRepository);
export const removeFlavourFromProtein =
  proteinRepository.removeFlavour.bind(proteinRepository);
export const updateFlavourPrice =
  proteinRepository.updateFlavourPrice.bind(proteinRepository);
export const addCutToProtein = proteinRepository.addCut.bind(proteinRepository);
export const removeCutFromProtein =
  proteinRepository.removeCut.bind(proteinRepository);
export const updateCutPrice =
  proteinRepository.updateCutPrice.bind(proteinRepository);
