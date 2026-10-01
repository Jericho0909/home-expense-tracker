export function formatDueDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "2-digit"
    })
}