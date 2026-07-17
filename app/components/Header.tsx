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
                    className="menu-button mr-5 cursor-pointer p-2 rounded-full bg-[#F8F4E9]/10 border border-[#F8F4E9]/30 transition-all duration-300"
                >
                    <Menu 
                        size={30} 
                        color="#F8F4E9"
                        className="transition-transform duration-300"
                    />
                </button>
                <span className="mr-2">
                    <House size={40} color="#F8F4E9" />
                </span>
               <h1
                    className="text-2xl text-[#F5F5DC]"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                >
                    Zara Family Expenses
                </h1>
            </div>
        </header>
    )
}

export default Header;