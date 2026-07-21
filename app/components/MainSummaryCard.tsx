interface MainSummaryCardsProps {
    title: string;
    content: string
}

const MainSummaryCards = ({ title, content }: MainSummaryCardsProps) => {
    return (
        <div className="border border-[#B38B59] bg-[#F5E6D3] w-full h-20">
            <span>
                {title}
            </span>
            <span className="flex items-center justify-center h-full">
                {content}
            </span>
        </div>
    )
}

export default MainSummaryCards