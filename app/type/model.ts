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
    | "Grocery"
    | "Rice"
    | "Meat"
    | "Vegetables"
    | "Fruits"
    | "Snacks"
    | "Beverages"
    | "CleaningSupplies"
    | "LaundrySupplies"
    | "Toiletries"
    | "KitchenSupplies"

export type UtilitiesNames = 
    | "Electricity"
    | "Water"
    | "Internet"
    | "MobileLoad"
    | "MineralWater"
    | "CookingGas"

export type FoodAndHouseHoldNames = 
    | "Grocery"
    | "Rice"
    | "Meat"
    | "SeaFood"
    | "Vegetables"
    | "Fruits"
    | "Snacks"
    | "Beverages"
    | "CleaningSupplies"
    | "LaundrySupplies"
    | "Toiletries"
    | "KitchenSupplies"
    
export type FoodAndHouseHoldCategory = 
    | "Groceries"
    | "Meat"
    | "Seafood"
    | "Fruits"
    | "Vegetables"
    | "Snacks"
    | "Beverages"
    | "Cleaning"
    | "Laundry"
    | "PersonalCare"
    | "Kitchen"
    | "HomeSupplies"


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
    amount: number;
    createdAt: string;
}

export type UtilityExpense = Expense & {
    name: UtilitiesNames;
    billingStart: string;
    billingEnd: string;
    dueDate: string;
    status: StatusType;
}

export type FoodHouseholdExpense = Expense & {
    name: string;
    type: "Food" | "Household";
    category: FoodAndHouseHoldCategory 
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