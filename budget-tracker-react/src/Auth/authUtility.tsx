import { jwtDecode } from "jwt-decode";

// Note: this does not validate the signature, it just extracts the JSON payload from the token, which could have been tampered with.
// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-without-using-a-library
// For security, always validate the token on the backend.
// TO DO: Add this to owasp documentation


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
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}
