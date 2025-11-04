import ky from "ky";

export interface BalanceResponse {
    balance: number;
}

export interface ExpensesResponse {
    totalExpenses: number;
}

export interface IncomeResponse {
    totalIncome: number;
}

const api = ky.create({
    prefixUrl: 'http://localhost:8080/api/person',
    timeout: 5000,
    retry: 3,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getUserBalance(userId: number): Promise<number> {
    try {
        const response = await api.get(`${userId}/balance`);
        const data: number = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch user balance: ${error}`);
    }
}

export async function getTotalExpense(userId: number): Promise<number> {
       try {
        const response = await api.get(`${userId}/expense`);
        const data: number = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch user balance: ${error}`);
    }
}

export async function getTotalIncome(userId: number): Promise<number> {
    try {
        const response = await api.get(`${userId}/income`);
        const data: number = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch user income: ${error}`);
    }   
}