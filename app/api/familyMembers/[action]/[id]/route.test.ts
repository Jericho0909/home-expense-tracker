/**
 * @jest-environment node
 */

import { PUT } from "./route";

describe("PUT /api/familyMembers/[action]/[id]", () => {
    test("should update a family member successfully", async () => {
        const request = new Request("http://localhost:3000/api/familyMembers/PUT/e2fd349b-9f92-4a31-9e34-75cac009f3c3", {
            method: "PUT",
            body: JSON.stringify({
                name: "Jericho Zara",
                familyRole: "Father",
                money: 5000
            })
        });

        const response = await PUT(request, { params: Promise.resolve({
            id: "e2fd349b-9f92-4a31-9e34-75cac009f3c3"
        })})

        const result = await response.json()

        expect(response.status).toBe(200)
        expect(result.success).toBe(true)
        
    })
})