'use client'

import { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import SidebarContext from '@/app/context/sidebarContext';
import ExpensesSectionContext from "@/app/context/expensesSectionContext";
import { motion } from "framer-motion";
import {  Wallet,
    House,
    Lightbulb,
    CookingPot,
    Car,
    Heart,
    Hammer,
    HouseHeart,
    ReceiptText
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
                className="flex items-center text-2xl text-[#F5F5DC]"
                style={{ fontFamily: "var(--font-cinzel)" }}
            >
                <span className="mr-2">
                    <Wallet size={30} className="text-[#E3B778]"
                    />
                </span>
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
                            ${activeSection === "Food&Household" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <CookingPot size={24} className={
                                    activeSection === "Food&Household"
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
                        href="/expenses/transportation"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "Transportation" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <Car size={24} className={
                                    activeSection === "Transportation"
                                    ? "text-[#CD7F32]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Transportation
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/health"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "Health" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <Heart size={24} className={
                                    activeSection === "Health"
                                    ? "text-[#D8A7A7]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Health
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/housemaintenance"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "HouseMaintenance" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <Hammer size={24} className={
                                    activeSection === "HouseMaintenance"
                                    ? "text-[#B8B0A5]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        House Maintenance
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/familyexpenses"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "FamilyExpenses" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <HouseHeart size={24} className={
                                    activeSection === "FamilyExpenses"
                                    ? "text-[#E3B778]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Family Expenses
                    </Link>
                </li>
                <li
                    className="mb-4"
                >
                    <Link
                        href="/expenses/otherexpenses"
                        onClick={toggleSidebar}
                        className={`flex items-center text-lg px-2 transition-all duration-300
                            ${activeSection === "OtherExpenses" ? "text-[#D2B48C] border-l-4 border-[#D2B48C] pl-4 tracking-wide" : ` text-[#F8F4E9] notActiveSection` }
                        `}
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                        <span className="mr-2">
                            <ReceiptText size={24} className={
                                    activeSection === "OtherExpenses"
                                    ? "text-[#A89F91]"
                                    : "text-[#F8F4E9]"
                                } 
                            />
                        </span>
                        Other Expenses
                    </Link>
                </li>
                
            </ul>
        </motion.aside>
    )
}

export default Sidebar;