/**
 * @jest-environment node
 */

import { getFamilyMembers } from "@/lib/familyMembers";
import { POST } from "./route";

global.fetch = jest.fn();

describe("GET /api/familyMembers", () => {
  test("should fetch family members", async () => {
    const mockFamilyMembers = [
        {
            id: "123",
            name: "Jericho Zara",
            familyRole: "Father",
            money: 25000,
        }
    ];

    (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockFamilyMembers),
    })

    const result = await getFamilyMembers();

    expect(fetch).toHaveBeenCalledWith(
        "/api/familyMembers",
        {
            method: "GET",
        }
    );

    expect(result).toEqual({
        status: 200,
        data: mockFamilyMembers,
    })
  })

  test("should create a family member", async () => {
        const request = new Request(
            "http://localhost/api/familyMembers",
            {
                method: "POST",
                body: JSON.stringify({
                    name: "Jericho Zara",
                    familyRole: "Father",
                    money: 35000,
                }),
            }
        )

        const response = await POST(request)

        expect(response.status).toBe(201)
    })
})