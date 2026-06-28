import { Transaction } from "./transactionTypes";

export class FinanceTracker {
    private transactions: Transaction[] = []; // all stored transactions follow the imported interface

    // add a transaction (income or expense) to the system
    addTransaction(transaction: Transaction): void {
        this.transactions.push(transaction)
    }

    // delete a transaction (income or expense) from the system based on ID
    deleteTransaction(id: string): void {
        this.transactions = this.transactions.filter(t => t.id != id);
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

        return true;
    }
}