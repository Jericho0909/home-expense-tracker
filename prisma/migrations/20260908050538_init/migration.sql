/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UtilityCategory" AS ENUM ('Electricity', 'Water', 'Internet', 'MobileLoad', 'MineralWater');

-- CreateEnum
CREATE TYPE "FoodHouseholdType" AS ENUM ('Food', 'Household');

-- CreateEnum
CREATE TYPE "FoodHouseholdCategory" AS ENUM ('Groceries', 'Meat', 'Seafood', 'Fruits', 'Vegetables', 'Snacks', 'Beverages', 'Cleaning', 'Laundry', 'PersonalCare', 'Kitchen', 'HomeSupplies');

-- CreateEnum
CREATE TYPE "TransportationCategory" AS ENUM ('Fuel', 'PublicTransport', 'RideHailing', 'Parking', 'Toll', 'VehicleMaintenance');

-- CreateEnum
CREATE TYPE "HealthCategory" AS ENUM ('Medicine', 'Consultation', 'Dental', 'Laboratory', 'Other');

-- CreateEnum
CREATE TYPE "HouseMaintenanceCategory" AS ENUM ('Repairs', 'Maintenance', 'Cleaning', 'PestControl', 'Other');

-- CreateEnum
CREATE TYPE "FamilyExpenseCategory" AS ENUM ('Education', 'Allowance', 'Entertainment', 'Celebrations', 'Other');

-- CreateEnum
CREATE TYPE "OtherExpenseCategory" AS ENUM ('Personal', 'Donations', 'Subscriptions', 'Government', 'Miscellaneous', 'Tickets', 'Fees', 'Services');

-- CreateEnum
CREATE TYPE "FamilyRole" AS ENUM ('Father', 'Mother', 'Son', 'Daughter', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Paid', 'Pending', 'Overdue', 'Unpaid');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Cash', 'GCash', 'BankTransfer', 'CreditCard', 'DebitCard');

-- DropTable
DROP TABLE "Expense";

-- DropEnum
DROP TYPE "Sections";

-- CreateTable
CREATE TABLE "UtilityExpense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "UtilityCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "billingStart" TIMESTAMP(3) NOT NULL,
    "billingEnd" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod",
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UtilityExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodHouseholdExpense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FoodHouseholdType" NOT NULL,
    "category" "FoodHouseholdCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod",
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodHouseholdExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportationExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TransportationCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransportationExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" "HealthCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseMaintenanceExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" "HouseMaintenanceCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseMaintenanceExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FamilyExpenseCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherExpense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" "OtherExpenseCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "familyRole" "FamilyRole" NOT NULL,
    "money" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);
