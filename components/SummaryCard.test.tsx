import { render, screen } from "@testing-library/react";
import SummaryCards from "./SummaryCard";

describe("SummaryCards", () => {
    test("Should render the Title", () => {
        render(
            <SummaryCards
                title="Total Items"
                content={<strong>5</strong>}
            />
        )

        expect(screen.getByText("Total Items")).toBeInTheDocument()
    })


    test("should render the content", () => {
        render(
            <SummaryCards
                title="Total Items"
                content={<strong>5</strong>}
            />
        )

        expect(screen.getByText("5")).toBeInTheDocument()
    })
})