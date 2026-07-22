interface MainSummaryCardsProps {
    title: string;
    content: string
}

const MainSummaryCards = ({ title, content }: MainSummaryCardsProps) => {
    return (
        <div className="flex justify-center flex-col p-1 border border-[#B38B59] w-full h-22">
            <span
                className="font-bold"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                {title}
            </span>
            <span className="h-auto">
                {content}
            </span>
        </div>
    )
}

export default MainSummaryCards