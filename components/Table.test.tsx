import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ModalProvider } from "../context/modalContext";
import Table from "./Table";

import { TableColumn } from "../type/model"

export type DummyDataColumnType = {
    id: string | number
    test: string
}

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
    });
});

const dummyDataArr:DummyDataColumnType[] = [
    {
        id: "1",
        test: "Dummy Column Value"
    }
]

const DummyDataColumn: TableColumn<DummyDataColumnType>[] = [
    {
        label: "Test",
        render: (item) => (
            <div>
                {item.test}
            </div>
        ) 
            
    },
]


describe("Table", () => {
    test("Should render Column correctly", () => {
        render(
             <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/utilities/viewUtilities"
                    editLink="/expenses/utilities/editUtilities"
                    payLink="/expenses/utilities/payUtilities"
                />
            </ModalProvider>
        )
        expect(screen.getByText("Dummy Column Value")).toBeInTheDocument()
    })

    test("Should navigate to view page", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/utilities/viewUtilities"
                    editLink="/expenses/utilities/editUtilities"
                    payLink="/expenses/utilities/payUtilities"
                />
            </ModalProvider>
        );

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "view" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/utilities/viewUtilities/1"
        )
    })

    test("Should navigate to edit page", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/utilities/viewUtilities"
                    editLink="/expenses/utilities/editUtilities"
                    payLink="/expenses/utilities/payUtilities"
                />
            </ModalProvider>
        )

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "edit" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/utilities/editUtilities/1"
        )
    })

    test("Should navigate to pay page", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/utilities/viewUtilities"
                    editLink="/expenses/utilities/editUtilities"
                    payLink="/expenses/utilities/payUtilities"
                />
            </ModalProvider>
        )

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "pay" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/utilities/payUtilities/1"
        )
    })

    test("Should not render Pay option when payLink is not provided", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/utilities/viewUtilities"
                    editLink="/expenses/utilities/editUtilities"
                />
            </ModalProvider>
        );

        expect(
            screen.queryByRole("option", { name: "Pay" })
        ).not.toBeInTheDocument()
    })
})