export const getAllExpensesBudget = async () => {
    try{
        const response = await fetch("/api/budget", {
            method: "GET",
        })

        if(!response.ok){
            throw new Error("Failed to fetch all expenses budget")
        }

        const data = await response.json()

        return {
            status: response.status,
            data,
        }
    }catch(error){
        console.error("Failed to fetch all expenses budget:", error);
        throw error;
    }
}