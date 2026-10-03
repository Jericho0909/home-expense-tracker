const formatPurchaseDate = (date: string) => {
    const purchaseDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return `${purchaseDate}`
}

export default formatPurchaseDate