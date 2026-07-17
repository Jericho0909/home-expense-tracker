'use client'

import { useRef, useEffect, useContext } from "react";
import SidebarContext from '@/app/context/sidebarContext';
import { motion } from "framer-motion";

const Sidebar = () => {
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const { toggleSidebar } = useContext(SidebarContext)!
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                toggleSidebar()
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={sidebarRef}
            className="fixed top-0 left-0 h-full w-60 bg-[#8B5E3C] py-10 px-6"
        >
            <h2 
                className="text-2xl text-[#F5F5DC]"
                style={{ fontFamily: "var(--font-cinzel)" }}
            >
                Expenses
            </h2>
            <ul className="mt-4 space-y-2">
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Dashboard
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Utilities
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Food & Household
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Transportation
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Health
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        House Maintenance
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Family Expenses
                    </a>
                </li>
                <li
                    className="mb-4"
                >
                    <a 
                        href="#" 
                        className="text-xl text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Other Expenses
                    </a>
                </li>
                
            </ul>
        </motion.aside>
    )
}

export default Sidebar;