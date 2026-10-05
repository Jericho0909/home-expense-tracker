/**
 * @jest-environment node
 */

import { getFamilyMembers } from "@/lib/familyMembers";

global.fetch = jest.fn();

describe("GET /api/familyMembers", () => {
  test("should fetch family members", async () => {
    const mockFamilyMembers = [
      {
        id: "123",
        name: "Jericho Zara",
        familyRole: "Father",
        money: 25000,
      },
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
})