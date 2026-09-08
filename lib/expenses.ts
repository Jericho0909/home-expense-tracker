export async function getExpenses(
    category: string,
    page = 1,
    limit = 10
) {
    const response = await fetch(
        `/api/expenses/${category}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }

    return response.json()
}