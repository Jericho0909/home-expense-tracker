import formatBillingPeriod from "./formatBillingPeriod";

describe("formatBillingPeriod", () => {
    test("should formatBillingPeriod date is correct", () => {
        expect(formatBillingPeriod("2026-07-01", "2026-07-31")).toBe("Jul 1–31, 2026")
    })
})