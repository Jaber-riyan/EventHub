import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Loading from '../../Pages/Shared/Loading/Loading';
import useAuth from '../../hooks/useAuth'

const PrivateRoutes = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;