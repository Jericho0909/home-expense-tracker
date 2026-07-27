import type { ReactNode } from "react";

export type ExpenseSection = 
    | "Dashboard"
    | "Utilities"
    | "Food&Household"
    | "Transportation"
    | "Health"
    | "HouseMaintenance"
    | "FamilyExpenses"
    | "OtherExpenses"

export type ExpensesNames = 
    | "Electricity"
    | "Water"
    | "Internet"
    | "MobileLoad"
    | "MineralWater"
    | "CookingGas"

export type StatusType =
    | "Paid"
    | "Pending"
    | "Overdue"
    | "Unpaid"

export type IconType = {
    icon: React.ReactNode;
}

export type TableColumn<T> = {
    label: string;
    render: (item: T) => ReactNode;
};

export type Expense = {
    id: number;
    expense: ExpenseSection;
    name: ExpensesNames;
    amount: number;
    createdAt: string;
}

export type UtilityExpense = Expense & {
    billingStart: string;
    billingEnd: string;
    dueDate: string;
    status: StatusType;
}

export type FoodHouseholdExpense = Expense & {
    purchaseDate: string;
}

export type TransportationExpense = Expense & {
    purchaseDate: string;
};

export type HealthExpense = Expense & {
    purchaseDate: string;
}

export type ExpenseData =
    | UtilityExpense
    | FoodHouseholdExpense
    | TransportationExpense
    | HealthExpense;