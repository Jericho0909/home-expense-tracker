interface SummaryCardsProps {
    title: string;
    content: React.ReactNode;
}

const SummaryCards = ({ title, content }: SummaryCardsProps) => {
    return (
        <div className="flex justify-start flex-col p-1 border border-[#B38B59] w-full h-24">
            <span
                className="font-bold text-[#3B2416] text-base"
                style={{ fontFamily: "var(--font-cinzel)"}}
            >
                {title}
            </span> 
            <div 
                className="flex items-center h-full text-[#8B5E3C]"
                style={{ fontFamily: "var(--font-libre-baskerville)"}}
            >
                {content}
            </div>
        </div>
    )
}

export default SummaryCards