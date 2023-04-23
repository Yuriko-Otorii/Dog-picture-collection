import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const refreshToken = localStorage.getItem("refreshToken")
    
    if(!refreshToken){
        return <Navigate to="/login" />
    }
    return (
        <Outlet /> 
    )
}

export default PrivateRoute