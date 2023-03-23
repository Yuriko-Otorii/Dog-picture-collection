import { ReactNode } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


type Props = {
  children?: ReactNode;
};

function publicRoute() {
  const { user } = useAuth();

  if(user){
    return <Navigate to="/login" />
  }
  return <Outlet/>
}

export default publicRoute