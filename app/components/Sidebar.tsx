'use client'

import { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import SidebarContext from '@/app/context/sidebarContext';
import ExpensesSectionContext from "@/app/context/expensesSectionContext";
import { motion } from "framer-motion";
import { House,
    Lightbulb,
    CookingPot
} from 'lucide-react';

const Sidebar = () => {
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const { toggleSidebar } = useContext(SidebarContext)!
    const { activeSection } = useContext(ExpensesSectionContext)!

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
    }, [])

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={sidebarRef}
            className="fixed top-0 left-0 h-full w-70 bg-[#8B5E3C] py-10 px-6"
        >
            <h2 
                className="text-2xl text-[#F5F5DC]"
                style={{ fontFamily: "var(--font-cinzel)" }}
            >
                Expenses
            </h2>
            <ul className="mt-10 space-y-2">
                <li
                    className="mb-4"
                >
                    <Link
                        href="/dashboard" 
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "Dashboard" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <House size={24} className={
                                    activeSection === "Dashboard"
                                    ? "text-[#D2B48C]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Dashboard
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/utilities"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "Utilities" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                    >
                        <span className="mr-2">
                            <Lightbulb size={24} className={
                                    activeSection === "Utilities"
                                    ? "text-[#F4C430]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Utilities
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/foodandhouse"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "Food & Household" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <CookingPot size={24} className={
                                    activeSection === "Food & Household"
                                    ? "text-[#B87333]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Food & Household
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="#" 
                        onClick={toggleSidebar}
                        className="flex items-center text-lg text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Transportation
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="#"
                        onClick={toggleSidebar}
                        className="flex items-center text-lg text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Health
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="#"
                        onClick={toggleSidebar}
                        className="flex items-center text-lg text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        House Maintenance
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="#"
                        onClick={toggleSidebar}
                        className="flex items-center text-lg text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Family Expenses
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="#"
                        onClick={toggleSidebar}
                        className="flex items-center text-lg text-[#F8F4E9]"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        Other Expenses
                    </Link>
                </li>
                
            </ul>
        </motion.aside>
    )
}

export default Sidebar;