import { ReactNode, useEffect } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';

import { useAuth } from './AuthContext';


function PrivateRoute() {
    const { user } = useAuth();
    // console.log(user)

    if(!user){
        return <Navigate to="/login" />
    }
    return (
        <Outlet /> 
    )
}

export default PrivateRoute