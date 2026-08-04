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

export type TransportationCategory =
    | "Fuel"
    | "PublicTransport"
    | "RideHailing"
    | "Parking"
    | "Toll"
    | "VehicleMaintenance";

export type HealthCategory =
    | "Medicine"
    | "Consultation"
    | "Dental"
    | "Laboratory"
    | "Other";

export type HouseMaintenanceCategory =
    | "Repairs"
    | "Maintenance"
    | "Cleaning"
    | "PestControl"
    | "Other";

export type FamilyExpensesCategory =
    | "Education"
    | "Allowance"
    | "Entertainment"
    | "Celebrations"
    | "Other"

export type OtherExpenseCategory =
    | "Personal"
    | "Donations"
    | "Subscriptions"
    | "Government"
    | "Miscellaneous"
    | "Tickets"
    | "Fees"
    | "Services"

export type StatusType =
    | "Paid"
    | "Pending"
    | "Overdue"
    | "Unpaid"

export type IconType = {
    icon: React.ReactNode;
}

export type SummaryType = {
    id: string | number;
    name: string;
    amount?: number,
    itemLength?: string,
    total?: number,
    budget?: number
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
    category: TransportationCategory;
    name: string
    purchaseDate: string;
};

export type HealthExpense = Expense & {
    name: string;
    category: HealthCategory
    purchaseDate: string;
}

export type HouseMaintenanceExpense = Expense & {
    name: string;
    category: HouseMaintenanceCategory
    purchaseDate: string;
}

export type FamilyExpense = Expense & {
    name: string;
    category: FamilyExpensesCategory;
    purchaseDate: string;
}

export type OtherExpense = Expense & {
    name: string;
    category: OtherExpenseCategory;
    purchaseDate: string;
}

export type ExpenseData =
    | UtilityExpense
    | FoodHouseholdExpense
    | TransportationExpense
    | HealthExpense;