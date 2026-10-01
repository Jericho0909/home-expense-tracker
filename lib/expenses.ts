export async function getExpenses(
    category: string,
    page: number,
    limit: number
) {
    try {
        const response = await fetch(
            `/api/expenses/${category}?page=${page}&limit=${limit}`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        return response.json();
    } catch (error) {
        console.error("Failed to fetch expenses:", error);
        throw error;
    }
}