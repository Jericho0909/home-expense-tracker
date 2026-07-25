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
};

export type ExpensesDataType = {
    id: number;
    expense: ExpenseSection;
    name: ExpensesNames;
    amount: number;
    billingStart: string;
    billingEnd: string;
    dueDate: string;
    status: StatusType;
};