'use client'

import { useContext } from 'react';
import SidebarContext from '@/app/context/sidebarContext';
import { House,  Menu  } from 'lucide-react';



const Header = () => {
    const { toggleSidebar } = useContext(SidebarContext)!
    return (
        <header
            className="fixed flex items-center top-0 w-full bg-[#5C4033] text-[#F8F4E9] py-4 px-2"
        >
            <div className="flex items-center p-1">
                <button 
                    onClick={toggleSidebar} 
                    className="mr-5 cursor-pointer"
                >
                    <Menu size={30} color="#F8F4E9" />
                </button>
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