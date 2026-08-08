import { Lightbulb,
    CookingPot,
    Car,
    Heart,
    Hammer,
    HouseHeart,
    ReceiptText,
} from 'lucide-react';

const BudgetForm = () => {
    const hanldeSubmit = () => {
        console.log("testing")
    }

    return (
        <form 
            className="flex justify-center w-full p-4"
            onSubmit={hanldeSubmit}
        >
            <div className="flex flex-col items-center border border-[#B38B59] rounded-lg p-4">
                <h3 
                    className="flex text-lg font-bold mb-3 text-[#3B2416] border-b-2 border-black w-full"
                    style={{ fontFamily: "var(--font-cinzel)"}}
                >
                    The Budget
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-7">
                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Utilities-Budget" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Lightbulb 
                                    size={24} 
                                    className="text-[#F4C430]"
                                />
                            </span>
                            Utilities:
                        </label>

                        <input
                            id="Utilities-Budget"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Food-and-House" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <CookingPot 
                                    size={24} 
                                    className="text-[#B87333]"
                                />
                            </span>
                            Food and House:
                        </label>

                        <input
                            id="Food-and-House"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Transportation" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Car 
                                    size={24} 
                                    className="text-[#CD7F32]"
                                />
                            </span>
                            Transportation:
                        </label>

                        <input
                            id="Transportation"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Health" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Heart
                                    size={24} 
                                    className="text-[#D8A7A7]"
                                />
                            </span>
                            Health:
                        </label>

                        <input
                            id="Health"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="House-Maintenance" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <Hammer
                                    size={24} 
                                    className="text-[#B8B0A5]"
                                />
                            </span>
                            House-Maintenance:
                        </label>

                        <input
                            id="House-Maintenance"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Family-Expenses" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <HouseHeart
                                    size={24} 
                                    className="text-[#E3B778]"
                                />
                            </span>
                            Family-Expenses:
                        </label>

                        <input
                            id="Family-Expenses"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="flex items-center justify-center gap-1 p-2">
                        <label 
                            htmlFor="Other-Expenses" 
                            className="flex items-center justify-end text-base font-medium text-[#3B2416] w-60"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                        >
                            <span className="mr-2">
                                <ReceiptText
                                    size={24} 
                                    className="text-[#A89F91]"
                                />
                            </span>
                            Other-Expenses:
                        </label>

                        <input
                            id="Other-Expenses"
                            type="number"
                            className="no-spinner bg-[#F5F5DC] border border-[#B38B59] text-[#3B2416] text-sm rounded-lg p-2 focus:ring-[#B38B59] focus:border-[#B38B59]"
                            style={{ fontFamily: "var(--font-libre-baskerville)" }}
                            placeholder=""
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="form-btn flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#F5F5DC] bg-[#964B00] rounded-lg shadow-md cursor-pointer w-1/4 transition-all duration-300"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                >
                    Save Budget
                </button>
            </div>
        </form>
    )
}

export default BudgetForm;