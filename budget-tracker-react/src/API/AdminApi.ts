import ky from "ky";
import { getToken } from "../Auth/authUtility";

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AdminTransaction {
  id: number;
  personId: number;
  username: string; 
  email: string;
  transactionType: string;
  accountType: string;
  description: string;
  amount: number;
  dateCreated: string;
}

const api = ky.create({
  prefixUrl: "http://localhost:8080/api/admin",
  headers: { "Content-Type": "application/json" },
  hooks: {
    beforeRequest: [
      request => {
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});

export async function fetchAllUsers(): Promise<AdminUser[]> {
  return api.get("users").json<AdminUser[]>();
}

export async function fetchAllTransactions(): Promise<AdminTransaction[]> {
  return api.get("transactions").json<AdminTransaction[]>();
}
