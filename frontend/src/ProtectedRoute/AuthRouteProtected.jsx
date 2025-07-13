import React, { useContext } from 'react'
import { BlogContext } from '../ContextAPI/BlogContextAPI';
import { Navigate } from 'react-router-dom';

const AuthRouteProtected = ({ children }) => {

    const { authUser } = useContext(BlogContext);
    const token = localStorage.getItem('token');

    if (token && !authUser) {
        // Still loading user info (e.g., after refresh or login)
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!token || (authUser && authUser.isAdmin === false)) {
        return <Navigate to="/*" replace />;
    }
   
    return children;
}

export default AuthRouteProtected