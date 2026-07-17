'use client'

import { createContext, ReactNode } from 'react';
import useSidebar from '@/app/hooks/useSidebar';

interface SidebarContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar()

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContext