const formattedDate = (d?: string) => {
    if (!d) return "-"
    const date = new Date(d)
    const formatDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    return  formatDate
}

export default formattedDate
