import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
    test("should the first Letter is Capital Letter", () => {
        expect(capitalizeFirstLetter("capital Letter")).toBe("Capital Letter")
    })
})