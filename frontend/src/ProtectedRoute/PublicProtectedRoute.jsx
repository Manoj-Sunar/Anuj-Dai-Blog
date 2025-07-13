import { useContext} from "react";

import { Navigate } from "react-router-dom";
import { BlogContext } from "../ContextAPI/BlogContextAPI";


const PublicProtectedRoute = ({ children }) => {



    const { authUser } = useContext(BlogContext);

    const token = localStorage.getItem('token');


    if (token && authUser) {
        return <Navigate to={"/"} replace />
    }


    return children;
}

export default PublicProtectedRoute