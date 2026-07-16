import { House } from 'lucide-react';

const Header = () => {
    return (
        <header
            className="fixed top-0 w-full bg-[#5C4033] text-[#F8F4E9] py-4 px-2"
        >
            <div className="flex items-center p-1">
                <span className="mr-2">
                    <House size={40} color="#F8F4E9" />
                </span>
                <h1 className="text-2xl font-bold text-[#F5F5DC]">
                    Zara Family Expenses
                </h1>
            </div>
        </header>
    )
}

export default Header;