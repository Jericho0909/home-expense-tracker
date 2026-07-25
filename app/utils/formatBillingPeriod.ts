const formatBillingPeriod = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const startMonth = start.toLocaleDateString("en-US", {
        month: "short",
    });

    const endMonth = end.toLocaleDateString("en-US", {
        month: "short",
    });

    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = end.getFullYear();

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}–${endDay}, ${year}`;
    }

    return `${startMonth} ${startDay}–${endMonth} ${endDay}, ${year}`;
};

export default formatBillingPeriod