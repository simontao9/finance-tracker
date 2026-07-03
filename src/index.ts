import readline from "readline";
import { randomUUID } from "crypto";

import { FinanceTracker } from "./financeTracker";
import { Transaction, Category } from "./transactionTypes";

const tracker = new FinanceTracker();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu(): void {
    console.log("\n==== Finance Tracker ====");
    console.log("1. View Transactions");
    console.log("2. Add Transaction");
    console.log("3. Delete Transaction");
    console.log("4. Edit Transaction")
    console.log("0. Exit");

    rl.question("\nChoose an option: ", handleMenu);
}

function handleMenu(choice: string): void {
    switch (choice) {
        case "1":
            viewTransactions();
            break;

        case "2":
            addTransaction();
            break;

        case "3":
            deleteTransaction();
            break;

        case "4":
            updateTransaction();
            break

        case "0":
            console.log("\nGoodbye!");
            rl.close();
            break;

        default:
            console.log("\nInvalid option.");

            showMenu();
    }
}

function viewTransactions(): void {
    const transactions = tracker.getTransactions();

    if (transactions.length === 0) {
        console.log("\nNo transactions found.");
    } else {
        console.log("\n=== Transactions ===");

        transactions.forEach(transaction => {
            console.log(`
ID: ${transaction.id}
Type: ${transaction.type}
Amount: $${transaction.amount}
Description: ${transaction.description}
Category: ${transaction.category}
Date: ${transaction.date}
-----------------------------------
`);
        });
    }

    showMenu();
}

function addTransaction(): void {
    rl.question("Amount: ", amountInput => {

        rl.question("Description: ", description => {

            rl.question(
                "Type (income/expense): ",
                typeInput => {

                    const transaction: Transaction = {
                        id: randomUUID(),
                        amount: Number(amountInput),
                        description: description,
                        category: Category.Other,
                        date: new Date(),
                        type: typeInput as "income" | "expense"
                    };

                    tracker.addTransaction(transaction);

                    console.log("\nTransaction added.");

                    showMenu();
                }
            );
        });
    });
}

function deleteTransaction(): void {
    rl.question(
        "Enter transaction ID to delete: ",
        id => {

            tracker.deleteTransaction(id);

            console.log("\nTransaction deleted.");

            showMenu();
        }
    );
}

function updateTransaction(): void {
    rl.question("Transaction ID: ", (id: string) => {

        rl.question("New amount: ", (amountInput: string) => {

            rl.question("New description: ", (description: string) => {

                const success = tracker.updateTransaction(id, {
                    amount: Number(amountInput),
                    description: description
                });

                if (success) {
                    console.log("\nTransaction updated.");
                } else {
                    console.log("\nTransaction not found.");
                }

                showMenu();
            });

        });

    });
}

// Start the application
showMenu();