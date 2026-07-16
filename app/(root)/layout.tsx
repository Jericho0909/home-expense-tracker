'use client'

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useSidebar from '../hooks/useSidebar';
import { useEffect } from 'react'; 

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    const { isSidebarOpen } = useSidebar()
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