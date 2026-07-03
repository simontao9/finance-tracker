import fs from "fs";
import { Transaction } from "./transactionTypes";

const STORAGE_FILE_PATH = "./src/data/transactionStorage.json";

export function loadTransactions(): Transaction[] {
    try {
        if (!fs.existsSync(STORAGE_FILE_PATH)) {
            return [];
        }

        const data = fs.readFileSync(STORAGE_FILE_PATH, "utf-8");
        return JSON.parse(data) as Transaction[];} 
        
        catch (err) {
        console.error("Error fetching transactions:", err);
        return [];
    }
}

export function saveTransactions(transactions: Transaction[]): void {
    try {
        fs.writeFileSync(
            STORAGE_FILE_PATH,
            JSON.stringify(transactions, null, 2),
            "utf-8"
        );
    } catch (err) {
        console.error("Error saving transactions:", err);
    }
}