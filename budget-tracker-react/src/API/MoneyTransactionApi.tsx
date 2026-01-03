import ky from "ky";
import { getToken } from "../Auth/authUtility";   

export interface CreateTransactionRequest {
    userId: number;
    accountType: string;
    transactionType: string;
    description: string;
    amount: number;
}

export interface CreateTransactionResponse {
    id: number;
    personId: number;
    transactionType: string;
    accountType: string;
    description: string;
    amount: number;
}

export interface Transactions {
  id: number;
  transactionType: string;
  accountType: string;
  description: string;
  amount: number;
  dateCreated: string;
}

const api = ky.create({
    prefixUrl: 'http://localhost:8080/api/',
    timeout: 5000,
    retry: 3,
    headers: {
        'Content-Type': 'application/json',
    },
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


export async function createTransaction(transactionData: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    try {
    const response = await api.post("transactions", {
        json: transactionData,
    });
    const data: CreateTransactionResponse = await response.json();
    return data;
    } catch (error) {
        throw new Error(`Failed to create transaction: ${error}`);
    }
}

export async function fetchUserTransactions(userId: number): Promise<Transactions[]> {
    try {
        const response = await api.get(`transactions/${userId}`);
        const data: Transactions[] = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch transactions: ${error}`);
    }   
}

export async function deleteTransaction(id: number) {
  try {
    await api.delete(`transactions/${id}`);
  } catch (err) {
    console.error("Failed to delete transaction", err);
    throw err;
  }
}



