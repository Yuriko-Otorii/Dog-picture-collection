import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from './AuthContext';

function PrivateRoute() {
    const { user } = useAuth()
    const token = localStorage.getItem("token")    

    console.log(token);
    
        
    if(!token){
        console.log("!tolen");
        return <Navigate to="/login" />
    }
    return (
        <Outlet /> 
    )
}

export default PrivateRoute