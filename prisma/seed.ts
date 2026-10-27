
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ExpenseCategory } from "@prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const expenseCategories: ExpenseCategory[] = [
    "Utilities",
    "FoodAndHousehold",
    "Transportation",
    "Health",
    "HouseMaintenance",
    "FamilyExpenses",
    "OtherExpenses",
]

async function main() {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()

    for (const category of expenseCategories) {
        await prisma.expenseBudget.upsert({
        where: {
            category_year_month: {
            category,
            year,
            month,
            },
        },
        update: {},
        create: {
            category,
            month,
            year,
            amount: 0,
        },
        })
    }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
