import React, { useState, useEffect } from 'react';
import { Home, Settings, LogOut, Notebook, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);





    return (
        <>
            {/* Toggle Button (visible only on mobile) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-40 p-2 rounded-md text-white lg:hidden"
            >
                <X className="lg:hidden cursor-pointer" />
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? '0%' : '-100%' }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="fixed top-0 left-0 h-full bg-white w-64 z-30 shadow-md lg:translate-x-0 lg:static lg:shadow-none lg:block"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                    <X className="lg:hidden cursor-pointer" onClick={() => setIsOpen(false)} />
                </div>

                <nav className="p-4 space-y-5 text-sm">
                    <Link to={"/admin"} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        <Home size={20} /> Dashboard
                    </Link>
                    <Link to={'/admin/admin-blog'} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        <Notebook size={20} /> Blogs
                    </Link>
                    <Link className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        <Settings size={20} /> Settings
                    </Link>
                    <Link to={'/logout'} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        <LogOut size={20} /> Logout
                    </Link>
                </nav>
            </motion.aside>
        </>

    );
};

export default AdminSidebar;
