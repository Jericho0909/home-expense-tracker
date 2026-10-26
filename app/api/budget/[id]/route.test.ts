/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { PUT } from "./route";
describe("PUT/api/budget/[id]", () => {
    test("should update a utility expense successfully", async () => {
        const request = new NextRequest(
            "http://localhost/api/budget/4aad72bb-f6ea-4b65-aed9-7fcefac202f6",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: "Utilities",
                    amount: "6500.00",
                })
            }
        )

        const response = await PUT(request, { params: Promise.resolve({
            id: "4aad72bb-f6ea-4b65-aed9-7fcefac202f6"
        }) })
        const result = await response.json()
        
        console.log("Request:", typeof Request);
        console.log("Response:", typeof Response);

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
    })
})