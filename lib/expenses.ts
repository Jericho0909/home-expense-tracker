export async function getExpenses(category: string) {
    const response = await fetch(`/api/expenses/${category}`);

    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }

    return response.json();
}