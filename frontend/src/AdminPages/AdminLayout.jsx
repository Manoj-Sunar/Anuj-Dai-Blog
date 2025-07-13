import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./AdminComponent/AdminHeader";
import AdminSidebar from "./AdminComponent/AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <AdminHeader />

                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="mt-16 p-4 bg-gray-100 "
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminLayout;
