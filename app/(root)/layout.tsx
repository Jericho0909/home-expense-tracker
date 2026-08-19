'use client'

import { useContext } from 'react';
import SidebarContext from '@/app/context/sidebarContext';
import ModalContext from '../context/modalContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Modal from '../components/modal/Modal';
import { AnimatePresence } from "framer-motion";


export default function RootLayout({ children, modal }: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
    const { isSidebarOpen } = useContext(SidebarContext)!
    const { isOpen, activeModal } = useContext(ModalContext)!
    return (
        <>
            {isOpen &&  (
                <Modal>
                    {activeModal}
                </Modal>
            )}
            <Header/>
            <div className="mt-20 p-4 min-h-screen w-full bg-[#F1E3D0]">
                <AnimatePresence>
                    {isSidebarOpen && <Sidebar />}
                </AnimatePresence>
                {children}
                {modal}
            </div>
        </>
    )
}