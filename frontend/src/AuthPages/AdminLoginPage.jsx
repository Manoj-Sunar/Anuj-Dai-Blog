import { useContext, useState } from "react";
import { AdminLogin } from "../actions/AdminApiC";
import { Navigate, useNavigate } from "react-router-dom";
import { BlogContext } from "../ContextAPI/BlogContextAPI";



const AdminLoginPage = () => {

  const {setAuthUser}=useContext(BlogContext);
const Navigate=useNavigate();

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  }

  const handleAdminLoginFormSubmit = async (e) => {
    e.preventDefault();
    const result = await AdminLogin(admin);
    if (result.status === true) {
      localStorage.setItem('token', result?.token);
      setAuthUser(result?.isAdmin);
      setAdmin({
        email: "",
        password: "",
      })

      Navigate('/admin');
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full animate-fadeIn">
        {/* Image Section */}
        <div className="md:w-1/2 bg-[#FBF8F2] flex items-center justify-center p-6">
          <img
            src="/login.png"
            alt="Admin login illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">Admin Login</h2>
          <p className="text-gray-600 mb-6 text-xs">Welcome back! Please login to continue.</p>
          <form className="space-y-5" onSubmit={handleAdminLoginFormSubmit}>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleInputChange}
                className="w-full px-4 text-xs py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleInputChange}
                className="w-full text-xs px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer text-xs w-full bg-[#8f71ff] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-6 text-center">
            © 2025 Admin Panel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
