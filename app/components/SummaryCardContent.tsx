import SummaryCards from "@/app/components/SummaryCard";
import type { SummaryType } from "@/app/type/model";
import { PhilippinePeso } from 'lucide-react';

interface SummaryCardContentProps {
    summaryDataArr: SummaryType[];
    budgetLeft?: number;
}

const SummaryCardContent = ({ summaryDataArr, budgetLeft }: SummaryCardContentProps) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })
    return (
        summaryDataArr.map((item, index) => (
            <SummaryCards
                key={index}
                title={item.name}
                content={
                    <div 
                        className="block text-sm"
                        style={{ fontFamily: "var(--font-libre-baskerville)"}}
                    >
                        {item.amount !== undefined && (
                            <div className="flex justify-center flex-col">
                                <span 
                                    className="flex gap-1"
                                >
                                    <PhilippinePeso
                                        size={16}
                                    />
                                    {item.amount?.toLocaleString("en-US")}
                                </span>
                                <span>
                                    {item.itemLength} 
                                </span>
                            </div>
                        )}
                        {item.total !== undefined && (
                            <p className="flex items-center flex-wrap">
                                
                                <PhilippinePeso
                                    size={16}
                                />
                                {item.total?.toLocaleString("en-US")}
                                {" "}
                                {currentDate}
                            </p>
                        )}
                        {item.budget !== undefined && (
                            <p 
                                className="flex items-center flex-wrap gap-1"
                                style={{ fontFamily: "var(--font-libre-baskerville)"}}
                            >
                                <PhilippinePeso size={16} />
                                {budgetLeft?.toLocaleString("en-US")}
                                {" "}of{" "}
                                <PhilippinePeso size={16} />
                                10,000
                            </p>
                        )}
                    </div>
                }
            />
        ))
            
    )
}

export default SummaryCardContent