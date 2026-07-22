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
    title: string;
    bill: number;
    status: StatusType
}