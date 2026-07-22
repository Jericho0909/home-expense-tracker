const ButtonModal = () => {
    const openModal = () => {
        console.log("Open Modal")
    }
    return (
        <button
            type="button"
            onClick={openModal}
            className="bg-[#8B5E3C] text-[#F8F4E9] px-5 py-2 rounded-md hover:bg-[#70482F] cursor-pointer"
        >
            + Add Expense
        </button>
    )
}

export default ButtonModal