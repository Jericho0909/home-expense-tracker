import type { ReactNode } from "react";

export type ExpenseSection = 
    | "Dashboard"
    | "Utilities"
    | "FoodAndHousehold"
    | "Transportation"
    | "Health"
    | "HouseMaintenance"
    | "FamilyExpenses"
    | "OtherExpenses"
    | "BudgetSetting"

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
    | "VehicleMaintenance"

export type HealthCategory =
    | "Medicine"
    | "Consultation"
    | "Dental"
    | "Laboratory"
    | "Other"

export type HouseMaintenanceCategory =
    | "Repairs"
    | "Maintenance"
    | "Cleaning"
    | "PestControl"
    | "Other"

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

export type FamilyRole =
    | "Father"
    | "Mother"
    | "Son"
    | "Daughter"
    | "Grandfather"
    | "Grandmother"
    | "Uncle"
    | "Aunt"
    | "Other";

export type StatusType =
    | "Paid"
    | "Pending"
    | "Overdue"
    | "Unpaid"

export type PaymentMethod =
    | "Cash"
    | "GCash"
    | "Bank Transfer"
    | "Maya"
    | "Other";

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
    id: string;
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
    paymentMethod?: PaymentMethod;
    paidAt?: string;
    notes : string;
}

export type FoodHouseholdExpense = Expense & {
    name: string;
    type: "Food" | "Household" | "";
    category: FoodAndHouseHoldCategory 
    purchaseDate: string;
}

export type TransportationExpense = Expense & {
    description: string
    category: TransportationCategory;
    date: string;
}

export type HealthExpense = Expense & {
    description: string;
    category: HealthCategory
    date: string;
}

export type HouseMaintenanceExpense = Expense & {
    description: string;
    category: HouseMaintenanceCategory
    date: string;
}

export type FamilyExpense = Expense & {
    description: string;
    category: FamilyExpensesCategory;
    date: string;
}

export type OtherExpense = Expense & {
    description: string;
    category: OtherExpenseCategory;
    date: string;
}

export type ExpenseData =
    | UtilityExpense
    | FoodHouseholdExpense
    | TransportationExpense
    | HealthExpense;

export type Member = {
    id: string;
    name: string;
    familyRole: FamilyRole;
    money: number;
    createdAt: string;
}

export type ModalContents =
    | ExpenseSection
    | "AddMember"

export type ExpenseCategory = 
    | "utilities"
    | "foodAndHousehold"
    | "transportation"
    | "health"
    | "houseMaintenance"
    | "familyExpenses"
    | "otherExpenses"

export type ActionContent = 
    | "editContribution" 
    | "editMember"
    | "viewMember"
    | "viewUtilities"
    | "viewFoodAndHousehold"
    | "viewTransportation"
    | "viewHealth"
    | "viewHouseMaintenance"
    | "viewFamilyExpenses"
    | "viewOtherExpenses"
    | "editUtilities"
    | "editFoodAndHousehold"
    | "editTransportation"
    | "editHealth"
    | "editHouseMaintenance"
    | "editFamilyExpenses"
    | "editOtherExpenses"
