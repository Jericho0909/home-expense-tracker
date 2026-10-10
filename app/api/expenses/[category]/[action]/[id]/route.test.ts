/**
 * @jest-environment node
 */

import { PUT, DELETE } from "./route";
import { prisma } from "@/lib/prisma";

describe("PUT/api/expenses/[category]/[action]/[id]", () => {
    test("should update a utility expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Utilities/editUtilities/12f0eae0-a723-4262-814a-18cf9b610234",
            {
                method: "PUT",
                body: JSON.stringify({
                    name: "Electricity",
                    expense: "Utilities",
                    amount: 2700,
                    status: "Paid",
                    billingStart: new Date("2026-07-01"),
                    billingEnd: new Date("2026-07-31"),
                    dueDate: new Date("2026-07-15"),
                    paymentMethod: "GCash",
                    notes: "Paid before the due date."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "Utilities", id: "12f0eae0-a723-4262-814a-18cf9b610234" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update a food and household expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/FoodAndHousehold/editFoodAndHousehold/04c89794-8e61-4771-90d0-dfa227ce6f87",
            {
                method: "PUT",
                body: JSON.stringify({
                    expense: "FoodAndHousehold",
                    type: "Food",
                    category: "Groceries",
                    name: "Assorted Groceries",
                    amount: 2800,
                    status: "Paid",
                    purchaseDate: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Various grocery items for the household."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "FoodAndHousehold", id: "04c89794-8e61-4771-90d0-dfa227ce6f87" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update a food and transportation expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Transportation/editTransportation/0ceeb6e7-ad4f-48fb-96e0-fdeb784fd2c3",{
                method: "PUT",
                body: JSON.stringify({
                    expense: "Transportation",
                    category: "Fuel",
                    description: "Gasoline",
                    amount: 1000,
                    date: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Full tank refill.",
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "Transportation", id: "0ceeb6e7-ad4f-48fb-96e0-fdeb784fd2c3" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update a health expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Health/editHealth/022cd2fb-050e-4e90-9f59-147269ea838b",
            {
                method: "PUT",
                body: JSON.stringify({
                    expense: "Health",
                    category: "Medicine",
                    description: "Maintenance Medicine",
                    amount: 950,
                    createdAt: "2026-07-01",
                    date: "2026-07-26",
                    paymentMethod: "Cash",
                    notes: "Monthly maintenance medicine."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "Health", id: "022cd2fb-050e-4e90-9f59-147269ea838b" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update a house maintenance expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/HouseMaintenance/editHouseMaintenance/108b539d-b8d6-40ed-b381-4785540deceb",
            {
                method: "PUT",
                body: JSON.stringify({
                    expense: "HouseMaintenance",
                    category: "Repairs",
                    description: "Faucet Repair",
                    amount: 800,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "Repair for leaking kitchen faucet."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "HouseMaintenance", id: "108b539d-b8d6-40ed-b381-4785540deceb" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update a family expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/FamilyExpenses/editFamilyExpenses/03b69a6a-bb3a-43a5-9c27-6172a6e3653e",
            {
                method: "PUT",
                body: JSON.stringify({
                    expense: "FamilyExpenses",
                    category: "Education",
                    description: "School Supplies",
                    amount: 1500,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "School supplies for the new semester."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "FamilyExpenses", id: "03b69a6a-bb3a-43a5-9c27-6172a6e3653e" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })

    test("should update an other expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/OtherExpenses/editOtherExpenses/15a30bda-25ba-451e-b7d5-8bc0824fe919",
            {
                method: "PUT",
                body: JSON.stringify({
                    expense: "OtherExpenses",
                    category: "Personal",
                    description: "Haircut",
                    amount: 200,
                    createdAt: "2026-08-01",
                    date: "2026-07-28",
                    paymentMethod: "Cash",
                    notes: "Regular haircut."
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({ category: "OtherExpenses", id: "15a30bda-25ba-451e-b7d5-8bc0824fe919" }) })
        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })
});

describe("DELETE/api/expenses/[category]/[action]/[id]", () => {
    test("should delete a utility expense successfully", async () => {
        const mockDeletedUtility = {
            id: "0f7e3611-f0c6-419b-a802-3f01d97ca108",
            name: "Electricity",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/Utilities/deleteUtilities/0f7e3611-f0c6-419b-a802-3f01d97ca108",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.utilityExpense, "delete")
        .mockResolvedValue(mockDeletedUtility as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "Utilities",
                action: "deleteUtilities",
                id: mockDeletedUtility.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedUtility)

        expect(prisma.utilityExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedUtility.id
            }
        })
    })

    test("should delete a food and household expense successfully", async () => {
        const mockDeletedFoodAndHousehold = {
            id: "01283037-04b8-4875-a03b-cea87605572a",
            name: "Manok",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/FoodAndHousehold/deleteFoodandHoushold/01283037-04b8-4875-a03b-cea87605572a",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.foodHouseholdExpense, "delete")
        .mockResolvedValue(mockDeletedFoodAndHousehold as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "FoodAndHousehold",
                action: "deleteFoodAndHousehold",
                id: mockDeletedFoodAndHousehold.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedFoodAndHousehold)

        expect(prisma.foodHouseholdExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedFoodAndHousehold.id
            }
        })
    })

    test("should delete a transportation expense successfully", async () => {
        const mockDeletedTransportation = {
            id: "0ceeb6e7-ad4f-48fb-96e0-fdeb784fd2c3",
            description: "Gasoline",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/Transportation/deleteTransportation/0ceeb6e7-ad4f-48fb-96e0-fdeb784fd2c3",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.transportationExpense, "delete")
        .mockResolvedValue(mockDeletedTransportation as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "Transportation",
                action: "deleteTransportation",
                id: mockDeletedTransportation.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedTransportation)

        expect(prisma.transportationExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedTransportation.id
            }
        })
    })

    test("should delete a health expense successfully", async () => {
        const mockDeletedHealth = {
            id: "022cd2fb-050e-4e90-9f59-147269ea838b",
            description: "Maintenance Medicine",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/Health/deleteHealth/022cd2fb-050e-4e90-9f59-147269ea838b",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.healthExpense, "delete")
        .mockResolvedValue(mockDeletedHealth as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "Health",
                action: "deleteTransportation",
                id: mockDeletedHealth.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedHealth)

        expect(prisma.healthExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedHealth.id
            }
        })
    })

    test("should delete a housemaintenance expense successfully", async () => {
        const mockDeletedHousemaintenance = {
            id: "108b539d-b8d6-40ed-b381-4785540deceb",
            description: "Faucet Repair",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/HouseMaintenance/deleteHouseMaintenance/108b539d-b8d6-40ed-b381-4785540deceb",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.houseMaintenanceExpense, "delete")
        .mockResolvedValue(mockDeletedHousemaintenance as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "HouseMaintenance",
                action: "deleteHouseMaintenance",
                id: mockDeletedHousemaintenance.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedHousemaintenance)

        expect(prisma.houseMaintenanceExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedHousemaintenance.id
            }
        })
    })

    test("should delete a family expense successfully", async () => {
        const mockDeletedFamilyExpenses = {
            id: "03b69a6a-bb3a-43a5-9c27-6172a6e3653e",
            description: "Faucet Repair",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/FamilyExpenses/deleteFamilyExpenses/03b69a6a-bb3a-43a5-9c27-6172a6e3653e",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.familyExpense, "delete")
        .mockResolvedValue(mockDeletedFamilyExpenses as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "FamilyExpenses",
                action: "deleteFamilyExpenses",
                id: mockDeletedFamilyExpenses.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedFamilyExpenses)

        expect(prisma.familyExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedFamilyExpenses.id
            }
        })
    })

    test("should delete a other expense successfully", async () => {
        const mockDeletedOtherExpenses = {
            id: "0745903c-ae89-4d4f-a3bd-328444d8b4e3",
            description: "Movie",
            amount: 1500,
        }

        const request = new Request(
            "http://localhost/api/expenses/OtherExpenses/deleteOtherExpenses/0745903c-ae89-4d4f-a3bd-328444d8b4e3",
            {
                method: "DELETE"
            }
        )

        jest.spyOn(prisma.otherExpense, "delete")
        .mockResolvedValue(mockDeletedOtherExpenses as any)

        const response = await DELETE(request, {
            params: Promise.resolve({
                category: "OtherExpenses",
                action: "deleteOtherExpenses",
                id: mockDeletedOtherExpenses.id
            })
        })

        if (!response) {
            throw new Error("DELETE handler returned undefined")
        }

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockDeletedOtherExpenses)

        expect(prisma.otherExpense.delete).toHaveBeenCalledWith({
            where: {
                id: mockDeletedOtherExpenses.id
            }
        })
    })
})