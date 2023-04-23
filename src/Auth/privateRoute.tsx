import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const token = localStorage.getItem("token")        
        
    if(!token){
        console.log("!tolen");
        return <Navigate to="/login" />
    }
    return (
        <Outlet /> 
    )
}

export default PrivateRoute