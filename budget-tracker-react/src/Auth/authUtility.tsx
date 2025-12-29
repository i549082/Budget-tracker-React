import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  role: string;
  userId: number;
  exp: number;
}

export function saveToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function logout() {
  localStorage.removeItem("auth_token");
}

export function decodeToken(): DecodedToken | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("auth_token");
      return null;
    }

    return decoded;
  } catch {
    localStorage.removeItem("auth_token");
    return null;
  }
}
