const formatPurchaseDate = (date: string) => {
    const purchasDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return `${purchasDate}`
}

export default formatPurchaseDate