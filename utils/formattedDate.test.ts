import formattedDate from "./formattedDate";

describe("formattedDate", () => {
    test("should format the date correctly", () => {
        expect(formattedDate("2026-07-15")).toBe("July 15, 2026");
    });
});