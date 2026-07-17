'use client'

import { useEffect, useContext } from 'react';
import SidebarContext from '@/app/context/sidebarContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';



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
            <div className="flex">
                {isSidebarOpen && <Sidebar />}
                {children}
            </div>
        </>
    )
}