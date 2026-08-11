interface ModalFormButtonProps {
    handleCancel: () => void
}

const ModalFormButton = ({handleCancel}: ModalFormButtonProps) => {
    return (
        <div 
            className="flex items-center justify-end w-full gap-2"
            style={{
                fontFamily: "var(--font-libre-baskerville)"
            }}
        >
            <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn rounded-md border border-[#8B5E3C] bg-[#E6D2B5] px-4 py-2 text-sm font-semibold text-[#5C4033] cursor-pointer transition-all duration-150 ease-in-out"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="savebill-btn rounded-md bg-[#6B4632] px-4 py-2 text-sm font-semibold text-[#F5F5DC] cursor-pointer transition-all duration-150 ease-in-out"
            >
                Save Bill
            </button>
        </div>
    )
}

export default ModalFormButton