import ky from "ky";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

const api = ky.create({
  prefixUrl: "http://localhost:8080/api/",
  headers: { "Content-Type": "application/json" }
});

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const res = await api.post("register", { json: data });
  return res.json();
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post("login", { json: data });
  return res.json();
}
