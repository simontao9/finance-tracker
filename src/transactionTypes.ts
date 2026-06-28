export type TransactionType = "income" | "expense";

export enum Category {
    Food = "Food",
    Bills = "Bills",
    Transportaion = "Transportation",
    Entertainment = "Entertainment",
    Salary = "Salary",
    Other = "Other",
}

export interface Transaction {
    id: string,
    date: Date,
    type: TransactionType,
    amount: number,
    category: Category,
    description: string,

}