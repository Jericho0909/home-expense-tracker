'use client'

import { useEffect, useContext } from 'react';
import SidebarContext from '@/app/context/sidebarContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AnimatePresence } from "framer-motion";


export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    const { isSidebarOpen } = useContext(SidebarContext)!
    useEffect(() => {
        console.log('Sidebar is now', isSidebarOpen ? 'open' : 'closed');
    }, [isSidebarOpen]);
    return (
        <>
            <Header/>
            <div className="mt-20 p-4 min-h-screen w-full bg-[#F5E6C8]">
                <AnimatePresence>
                    {isSidebarOpen && <Sidebar />}
                </AnimatePresence>
                {children}
            </div>
        </>
    )
}