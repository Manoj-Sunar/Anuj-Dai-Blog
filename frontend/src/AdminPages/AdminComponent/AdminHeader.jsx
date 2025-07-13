import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminHeader = () => {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full h-16 bg-white  z-30 flex items-center justify-between px-4"
    >
      <div className="flex items-center gap-2">
        <Menu className="block lg:hidden" id="sidebarToggleBtn" />
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, Admin</span>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
