'use client'

import { useContext } from 'react';
import SidebarContext from '@/app/context/sidebarContext';
import ModalContext from '../context/modalContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Modal from '../components/modal/modal';
import { modalContents } from '../constant/modalContents';
import { AnimatePresence } from "framer-motion";


export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    const { isSidebarOpen } = useContext(SidebarContext)!
    const { isOpen, modalTitle, activeModal } = useContext(ModalContext)!
    return (
        <>
            {isOpen && (
                <Modal
                    title={modalTitle}
                >
                    {modalContents[activeModal!]}
                </Modal>
            )}
            <Header/>
            <div className="mt-20 p-4 min-h-screen w-full bg-[#F1E3D0]">
                <AnimatePresence>
                    {isSidebarOpen && <Sidebar />}
                </AnimatePresence>
                {children}
            </div>
        </>
    )
}