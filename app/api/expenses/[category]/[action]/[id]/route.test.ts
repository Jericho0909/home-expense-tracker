/**
 * @jest-environment node
 */

import { PUT } from "./route";

describe("PUT /api/expenses/[category]/[action]/[id]", () => {
    test("should update a utility expense successfully", async () => {
        const request = new Request(
            "http://localhost/api/expenses/Utilities/editUtilities/12f0eae0-a723-4262-814a-18cf9b610234",
            {
                method: "PUT",
                body: JSON.stringify({
                    name: "Electricity",
                    expense: "Utilities",
                    amount: 3500,
                    status: "Paid",
                    billingStart: new Date("2026-07-01"),
                    billingEnd: new Date("2026-07-31"),
                    dueDate: new Date("2026-07-15"),
                    paymentMethod: "GCash",
                    notes: "Paid before the due date."
                })
            }
        );

        const response = await PUT(request, { params: Promise.resolve({ category: "utility", id: "12f0eae0-a723-4262-814a-18cf9b610234" }) });
        const result = await response.json();

        expect(result.status).toBe(200)
    });
});