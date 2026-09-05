'use client'

import { useState } from 'react';

const useSidebar = () => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return { isSidebarOpen, toggleSidebar }
}

export default useSidebar

