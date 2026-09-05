-- CreateEnum
CREATE TYPE "Sections" AS ENUM ('Dashboard', 'Utilities', 'FoodAndHousehold', 'Transportation', 'Health', 'HouseMaintenance', 'FamilyExpenses', 'OtherExpenses', 'BudgetSetting');

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "expense" "Sections" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
