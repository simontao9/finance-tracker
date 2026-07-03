import { Transaction } from "./transactionTypes";
import { loadTransactions, saveTransactions } from "./transactionStorage";

export class FinanceTracker {
    private transactions: Transaction[] = []; // all stored transactions follow the imported interface

    constructor() {
        this.transactions = loadTransactions();
    }

    // add a transaction (income or expense) to the system
    addTransaction(transaction: Transaction): void {
        this.transactions.push(transaction)
        saveTransactions(this.transactions);
    }

    // delete a transaction (income or expense) from the system based on ID
    deleteTransaction(id: string): void {
        this.transactions = this.transactions.filter(t => t.id !== id);
        saveTransactions(this.transactions);
    }

    // get all transactions that are stored
    getTransactions(): Transaction[] {
        return this.transactions;
    }

    // edit a transaction
    updateTransaction(id: string, update: Partial<Transaction>): boolean {
        const index = this.transactions.findIndex(t => t.id === id);

        if (index === -1) {
            return false
        }

        this.transactions[index] = {
            ...this.transactions[index],
            ...update
        };

        saveTransactions(this.transactions);
        return true;
    }
}