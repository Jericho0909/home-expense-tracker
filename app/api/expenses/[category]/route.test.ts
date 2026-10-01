/**
 * @jest-environment node
 */

import { POST } from "./route";

describe("POST /api/expenses/[category]", () => {
    test("should create a utility expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Utilities",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "Utilities",
                    name: "Electricity",
                    amount: 3250,
                    billingStart: "2026-07-01",
                    billingEnd: "2026-07-31",
                    dueDate: "2026-07-15",
                    status: "Paid",
                    paymentMethod: "GCash",
                    notes: "Paid before the due date.",
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "Utilities",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a food and household expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/FoodAndHousehold",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "FoodAndHousehold",
                    type: "Food",
                    category: "Groceries",
                    name: "Assorted Groceries",
                    amount: 2500,
                    status: "Paid",
                    purchaseDate: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Various grocery items for the household."
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "FoodAndHousehold",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a transportation expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Transportation",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "Transportation",
                    category: "Fuel",
                    description: "Gasoline",
                    amount: 1500,
                    date: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Full tank refill.",
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "Transportation",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a health expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Health",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "Health",
                    category: "Medicine",
                    description: "Maintenance Medicine",
                    amount: 850,
                    createdAt: "2026-07-01",
                    date: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Monthly maintenance medicine."
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "Health",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a house maintenance expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/HouseMaintenance",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "HouseMaintenance",
                    category: "Repairs",
                    description: "Faucet Repair",
                    amount: 500,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "Repair for leaking kitchen faucet."
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "HouseMaintenance",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a family expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/FamilyExpense",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "FamilyExpenses",
                    category: "Education",
                    description: "School Supplies",
                    amount: 1200,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "School supplies for the new semester."
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "FamilyExpense",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a other expense", async () => {
        const request = new Request(
            "http://localhost/api/expenses/OtherExpense",
            {
                method: "POST",
                body: JSON.stringify({
                    expense: "OtherExpenses",
                    category: "Personal",
                    description: "Haircut",
                    amount: 300,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "Regular haircut."
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "OtherExpense",
            }),
        })

       expect(response.status).toBe(201)
    })

    test("should create a family member", async () => {
        const request = new Request(
            "http://localhost/api/expenses/FamilyMember",
            {
                method: "POST",
                body: JSON.stringify({
                    name: "Jericho Zara",
                    familyRole: "Father",
                    money: 25000,
                }),
            }
        )

        const response = await POST(request, {
            params: Promise.resolve({
                category: "FamilyMember",
            }),
        })

       expect(response.status).toBe(201)
    })
})