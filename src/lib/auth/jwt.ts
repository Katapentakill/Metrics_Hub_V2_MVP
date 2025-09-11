// JWT utilities for authentication
// TODO: When backend is implemented, JWT handling will be done server-side
// This is for frontend JWT simulation and future compatibility

import { AuthSession, User } from './types';

// JWT payload structure (matches what backend will send)
export interface JWTPayload {
  sub: string; // user ID
  email: string;
  name: string;
  role: string;
  avatar?: string;
  iat: number; // issued at
  exp: number; // expires at
  jti?: string; // JWT ID
}

// JWT header structure
export interface JWTHeader {
  alg: string;
  typ: string;
}

// Simulate JWT token generation (for demo purposes)
// TODO: Remove this when backend handles JWT generation
export function generateMockJWT(user: User, expiresInHours: number = 24): string {
  const header: JWTHeader = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    iat: now,
    exp: now + (expiresInHours * 60 * 60),
    jti: generateJWTId()
  };

  // In a real implementation, this would be signed with a secret
  // For demo purposes, we'll just encode the payload
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature'); // TODO: Replace with real HMAC signature

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Parse JWT token (for demo purposes)
// TODO: When backend is implemented, use a proper JWT library like 'jsonwebtoken'
export function parseJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }

    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT parsing error:', error);
    return null;
  }
}

// Check if JWT token is valid and not expired
export function isJWTValid(token: string): boolean {
  const payload = parseJWT(token);
  return payload !== null;
}

// Extract user info from JWT token
export function getUserFromJWT(token: string): Partial<User> | null {
  const payload = parseJWT(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role as any,
    avatar: payload.avatar
  };
}

// Generate refresh token (for demo purposes)
// TODO: When backend is implemented, refresh tokens will be handled server-side
export function generateRefreshToken(): string {
  return btoa(JSON.stringify({
    type: 'refresh',
    id: generateJWTId(),
    createdAt: Date.now(),
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  }));
}

// Validate refresh token
export function isRefreshTokenValid(refreshToken: string): boolean {
  try {
    const tokenData = JSON.parse(atob(refreshToken));
    return parseInt(tokenData.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

// Generate unique JWT ID
function generateJWTId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Create session from JWT token
export function createSessionFromJWT(token: string, refreshToken?: string): AuthSession | null {
  const payload = parseJWT(token);
  if (!payload) return null;

  return {
    userId: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role as any,
    avatar: payload.avatar,
    token,
    refreshToken,
    expiresAt: new Date(payload.exp * 1000).toISOString(), // Convert to ISO string
    createdAt: payload.iat * 1000,
    loginTime: new Date(payload.iat * 1000).toISOString()
  };
}

// Check if session is expired
export function isSessionExpired(session: AuthSession): boolean {
  return new Date(session.expiresAt).getTime() < Date.now();
}

// Get time until session expires (in minutes)
export function getSessionTimeRemaining(session: AuthSession): number {
  const remaining = new Date(session.expiresAt).getTime() - Date.now();
  return Math.max(0, Math.floor(remaining / (1000 * 60)));
}

// Auto-refresh session if needed
export function shouldRefreshSession(session: AuthSession): boolean {
  const timeRemaining = getSessionTimeRemaining(session);
  return timeRemaining < 30; // Refresh if less than 30 minutes remaining
}
