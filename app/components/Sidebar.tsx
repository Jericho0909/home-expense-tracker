import { motion } from "framer-motion";

const Sidebar = () => {
    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 h-full w-54 bg-[#8B5E3C] p-6"
        >
            <h2 className="text-xl font-bold">Expenses</h2>
        </motion.aside>
    )
}

export default Sidebar;