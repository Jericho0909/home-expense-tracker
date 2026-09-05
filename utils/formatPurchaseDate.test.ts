import formatPurchaseDate from "./formatPurchaseDate";

describe("formatPurchaseDate ", () => {
    test("should formatPurchaseDate is correct", () => {
        expect(formatPurchaseDate("2026-07-28")).toBe("Jul 28");
    });
});