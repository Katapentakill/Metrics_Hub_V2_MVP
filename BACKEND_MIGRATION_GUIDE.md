# Backend Migration Guide

This guide outlines the steps needed to migrate from the current mock authentication system to a real backend implementation.

## 🔄 Migration Overview

The authentication system has been structured to make backend migration as smooth as possible. All mock implementations are clearly marked with `TODO` comments and can be easily replaced with real API calls.

## 📁 File Structure

```
src/lib/auth/
├── types.ts           # TypeScript interfaces (ready for backend)
├── jwt.ts            # JWT utilities (ready for backend)
├── api.ts            # API abstraction layer (replace mock implementations)
├── authService.ts    # Main auth service (backend ready)
├── authActions.ts    # Action functions (backend ready)
├── authData.ts       # Mock data (remove when backend is ready)
├── authStore.ts      # Mock store (remove when backend is ready)
└── routeProtection.ts # Route protection (backend ready)
```

## 🚀 Migration Steps

### 1. Backend API Setup

Create your backend API with the following endpoints:

```typescript
// Required API endpoints
POST /api/auth/login
POST /api/auth/register
POST /api/auth/2fa
POST /api/auth/password-reset
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/profile
GET  /api/users
GET  /api/audit
GET  /api/security/alerts
```

### 2. Update API Configuration

In `src/lib/auth/api.ts`, update the configuration:

```typescript
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://your-api.com/api',
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    // ... other endpoints
  }
};
```

### 3. Replace Mock Implementations

#### In `src/lib/auth/api.ts`:

Replace all mock implementations with real API calls:

```typescript
// BEFORE (mock)
static async login(credentials: LoginRequest): Promise<LoginResponse> {
  // Mock implementation
  return mockResponse;
}

// AFTER (real API)
static async login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return await response.json();
}
```

### 4. Update Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret
```

### 5. Remove Mock Files

Once backend is implemented, you can remove:

- `src/lib/auth/authData.ts` (mock data)
- `src/lib/auth/authStore.ts` (mock store)
- All `TODO` comments and mock implementations

### 6. Update JWT Handling

In `src/lib/auth/jwt.ts`, replace mock JWT functions with real JWT library:

```bash
npm install jsonwebtoken
```

```typescript
import jwt from 'jsonwebtoken';

// Replace mock functions with real JWT handling
export function parseJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as JWTPayload;
  } catch (error) {
    return null;
  }
}
```

## 🔧 Key Changes Needed

### 1. API Calls

All functions in `api.ts` need to be updated to make real HTTP requests instead of returning mock data.

### 2. Error Handling

Update error handling to work with real API responses:

```typescript
// Add proper error handling for different HTTP status codes
if (response.status === 401) {
  // Handle unauthorized
} else if (response.status === 403) {
  // Handle forbidden
} else if (response.status >= 500) {
  // Handle server errors
}
```

### 3. Token Management

Update token storage and validation to work with real JWT tokens from your backend.

### 4. Session Management

Ensure session management works with real backend sessions and token refresh.

## 🧪 Testing

After migration:

1. Test all authentication flows
2. Verify JWT token handling
3. Test token refresh functionality
4. Verify role-based access control
5. Test error handling

## 📝 TODO Checklist

- [ ] Set up backend API endpoints
- [ ] Update API configuration
- [ ] Replace mock implementations in `api.ts`
- [ ] Update JWT handling
- [ ] Update environment variables
- [ ] Test all authentication flows
- [ ] Remove mock files
- [ ] Update error handling
- [ ] Test token refresh
- [ ] Verify security measures

## 🔒 Security Considerations

When implementing the backend:

1. Use HTTPS for all API calls
2. Implement proper JWT secret management
3. Add rate limiting
4. Implement proper CORS policies
5. Add input validation
6. Implement proper error handling
7. Add audit logging
8. Implement proper session management

## 📞 Support

If you need help with the migration, check:

- The TODO comments in the code
- This migration guide
- The API abstraction layer in `api.ts`
- The type definitions in `types.ts`
