export type ExpenseSection = 
    | "Dashboard"
    | "Utilities"
    | "Food&Household"
    | "Transportation"
    | "Health"
    | "HouseMaintenance"
    | "FamilyExpenses"
    | "OtherExpenses"

type StatusType =
    | "Paid"
    | "Pending"
    | "Overdue"
    | "Unpaid"

export interface UtilitySummaryDataType {
    id: string | number;
    expense: ExpenseSection;
    name: string;
    amount: number;
    dueDate: string
    status: StatusType
}