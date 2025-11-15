import ky from "ky";

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

const api = ky.create({
    prefixUrl: 'http://localhost:8080/api/',
    timeout: 5000,
    retry: 3,
    headers: {
        'Content-Type': 'application/json',
    },
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
