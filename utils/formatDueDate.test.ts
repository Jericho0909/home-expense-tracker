import { formatDueDate } from "./formatDueDate";

describe("formatDueDate", () => {
    test("should format the due date correctly", () => {
        expect(formatDueDate("2026-07-15T00:00:00.000Z")).toBe("July 15, 26")
    })
})