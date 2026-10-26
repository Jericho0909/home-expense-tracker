/**
 * @jest-environment node
 */

import { getAllExpensesBudget } from "@/lib/budget";
import { POST } from "./route";

global.fetch = jest.fn()

describe("GET and POST /api/budget/[id]", () => {
    test("should fetch all budget expenses", async () => {
        const mockAllBudget = [
            {
                id: "123",
                category: "Health",
                month: "10",
                year: "2026",
                amount: "1500",
                createdAt: "10/24/26",
                updatedAt: "10/24/26"
            }
        ];

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockAllBudget),
        })

        const response = await getAllExpensesBudget()

        expect(fetch).toHaveBeenCalledWith(
            "/api/budget",
            {
                method: "GET",
            }
        )

        expect(response).toEqual({
            status: 200,
            data: mockAllBudget,
        })
    })

    test("should create a budget", async () => {
        const request = new Request(
            "http://localhost/api/budget/",
            {
                method: "POST",
                body: JSON.stringify({
                    category: "Utilities",
                    amount: "5000.00",
                }),
            }
        )

        const response = await POST(request)
        expect(response.status).toBe(201)
    })
})