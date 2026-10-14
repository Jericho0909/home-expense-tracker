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
        id: "776b6ebb-f535-4bb3-81ce-244e06622f3d",
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
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    paidLink="/expenses/Utilities/paidUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        )
        expect(screen.getByText("Dummy Column Value")).toBeInTheDocument()
    })

    test("Should navigate to view modal", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    paidLink="/expenses/Utilities/paidUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        );

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "view" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/Utilities/viewUtilities/776b6ebb-f535-4bb3-81ce-244e06622f3d"
        )
    })

    test("Should navigate to edit modal", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    paidLink="/expenses/Utilities/paidUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        )

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "edit" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/Utilities/editUtilities/776b6ebb-f535-4bb3-81ce-244e06622f3d"
        )
    })

    test("Should navigate to paid modal", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    paidLink="/expenses/Utilities/paidUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        )

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "setpaid" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/Utilities/paidUtilities/776b6ebb-f535-4bb3-81ce-244e06622f3d"
        )
    })

    test("Should navigate to delete modal", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    paidLink="/expenses/Utilities/paidUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        )

        const actionSelect = screen.getByRole("combobox");

        fireEvent.change(actionSelect, {
            target: { value: "delete" },
        });

        expect(mockPush).toHaveBeenCalledWith(
            "/expenses/Utilities/deleteExpense/776b6ebb-f535-4bb3-81ce-244e06622f3d"
        )
    })

    test("Should not render Pay option when payLink is not provided", () => {
        render(
            <ModalProvider>
                <Table
                    data={dummyDataArr}
                    columns={DummyDataColumn}
                    viewLink="/expenses/Utilities/viewUtilities"
                    editLink="/expenses/Utilities/editUtilities"
                    delLink="/expenses/Utilities/deleteExpense"
                />
            </ModalProvider>
        );

        expect(
            screen.queryByRole("option", { name: "Pay" })
        ).not.toBeInTheDocument()
    })
})