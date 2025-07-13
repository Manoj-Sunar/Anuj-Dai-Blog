import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900  flex flex-col justify-center items-center text-white p-6"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-white text-indigo-600 rounded-full font-semibold shadow hover:bg-gray-100 transition text-sm"
      >
        Go Home
      </Link>
    </motion.div>
  );
};

export default PageNotFound;
