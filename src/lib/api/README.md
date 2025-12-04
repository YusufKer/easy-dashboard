# API Layer - Repository Pattern

This directory contains the API layer using the repository pattern for better organization and separation of concerns.

## Structure

```
lib/api/
├── index.ts                          # Main export file (backward compatible)
├── types.ts                          # TypeScript interfaces and types
├── client.ts                         # HTTP client with token refresh logic
└── repositories/
    ├── authRepository.ts             # Authentication operations
    ├── resourceRepository.ts         # Generic resource CRUD operations
    └── proteinRepository.ts          # Protein-specific operations
```

## Usage

### Option 1: Using Individual Repositories (Recommended)

```typescript
import { authRepository, resourceRepository, proteinRepository } from "@/lib/api";

// Authentication
await authRepository.login({ email, password });
await authRepository.register({ email, password });
await authRepository.logout();

// Resources
const proteins = await resourceRepository.fetchAll("protein");
const protein = await resourceRepository.fetchById("protein", id);
await resourceRepository.create("protein", name);
await resourceRepository.delete("protein", id);

// Protein-specific operations
await proteinRepository.addFlavour(proteinId, flavourId, price);
await proteinRepository.removeFlavour(proteinId, flavourId);
await proteinRepository.updateFlavourPrice(proteinId, flavourId, price);
```

### Option 2: Using Legacy Function Exports (Backward Compatible)

```typescript
import { loginUser, fetchResources, addFlavourToProtein } from "@/lib/api";

// Works exactly as before
await loginUser({ email, password });
const proteins = await fetchResources("protein");
await addFlavourToProtein(proteinId, flavourId, price);
```

## Features

- **Automatic Token Refresh**: All authenticated requests automatically refresh expired tokens
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Consistent error handling across all repositories
- **Separation of Concerns**: Each repository handles a specific domain
- **Backward Compatibility**: Existing code continues to work without changes

## Repositories

### AuthRepository

Handles authentication operations:

- `register(userData)` - Register a new user
- `login(credentials)` - Login and receive tokens
- `logout()` - Logout and invalidate tokens

### ResourceRepository

Generic CRUD operations for resources:

- `fetchAll(endpoint)` - Fetch all resources
- `fetchById(endpoint, id)` - Fetch a single resource
- `create(endpoint, name)` - Create a new resource
- `delete(endpoint, id)` - Delete a resource

### ProteinRepository

Protein-specific operations:

- `addFlavour(proteinId, flavourId, price)` - Add flavour to protein
- `removeFlavour(proteinId, flavourId)` - Remove flavour from protein
- `updateFlavourPrice(proteinId, flavourId, price)` - Update flavour price
- `addCut(proteinId, cutId, price)` - Add cut to protein
- `removeCut(proteinId, cutId)` - Remove cut from protein
- `updateCutPrice(proteinId, cutId, price)` - Update cut price

## Token Management

The `client.ts` module handles:

- Adding `Authorization: Bearer <token>` headers to requests
- Detecting 401 Unauthorized responses
- Automatically refreshing tokens using the refresh endpoint
- Retrying failed requests with new tokens
- Preventing multiple simultaneous refresh attempts
- Redirecting to login on refresh failure
