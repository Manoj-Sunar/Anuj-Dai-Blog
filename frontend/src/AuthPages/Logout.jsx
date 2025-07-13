import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../ContextAPI/BlogContextAPI';

const Logout = () => {
      const { setAuthUser } = useContext(BlogContext);
      const navigate = useNavigate();

      useEffect(() => {
            // Clear token and user
            localStorage.removeItem('token');
            setAuthUser(null);

            // Navigate after state update
            setTimeout(() => navigate('/'), 0);
      }, [setAuthUser, navigate]);

      return <></>;
};

export default Logout;
