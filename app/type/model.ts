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

export type BillIconType = {
    icon: React.ReactNode;
};

export interface ExpensesDataType {
    id: string | number;
    expense: ExpenseSection;
    name: ExpensesNames;
    amount: number;
    dueDate: string
    status: StatusType
}