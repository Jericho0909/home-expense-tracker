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
            className="fixed top-0 left-0 h-full w-54 bg-[#8B5E3C] p-6"
        >
            <h2 
                className="text-xl"
                style={{ fontFamily: "var(--font-playfair-display)" }}>
                Expenses
            </h2>
        </motion.aside>
    )
}

export default Sidebar;