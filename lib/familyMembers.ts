export const getFamilyMembers = async () => {
    try {
        const response = await fetch("/api/familyMembers", {
            method: "GET",
        })

        if(!response.ok){
            throw new Error("Failed to fetch family members");
        }

        const data = await response.json();

        return {
            status: response.status,
            data,
        };
    } catch (error) {
        console.error("Failed to fetch family members:", error);
        throw error;
    }
}