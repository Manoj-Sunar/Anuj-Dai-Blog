import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';


const AdminTable = () => {

 const {allBlogs}=useContext(BlogContext)

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  

  const handleDelete = (id) => {
    alert(`Delete blog with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit blog with ID: ${id}`);
  };

  const handleView = (id) => {
    alert(`View blog with ID: ${id}`);
  };







  return (
    <motion.div
      className="p-4 w-full overflow-x-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-4">Blog Management</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">
                <input type="checkbox" disabled />
              </th>
              <th className="p-3">SN</th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3 text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {allBlogs?.data?.map((blog, index) => (
              <motion.tr
                key={blog?._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(blog?._id)}
                    onChange={() => handleCheckboxChange(blog?._id)}
                    className="accent-blue-500"
                  />
                </td>
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">
                  <img
                  loading='lazy'
                    src={blog?.banner}
                    alt="blog"
                    className="w-14 h-10 rounded object-cover"
                  />
                </td>
                <td className="p-3 whitespace-nowrap max-w-[200px] truncate">{blog?.title}</td>
                <td className="p-3">{blog?.author?.name}</td>
                <td className="p-3 text-center flex gap-3 justify-center">
                  <button onClick={() => handleView(blog?._id)} title="View">
                    <Eye className="text-blue-500 hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => handleEdit(blog?._id)} title="Edit">
                    <Edit className="text-yellow-500 hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => handleDelete(blog?._id)} title="Delete">
                    <Trash2 className="text-red-500 hover:scale-110 transition-transform" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length:allBlogs?.data?.length}, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminTable;
