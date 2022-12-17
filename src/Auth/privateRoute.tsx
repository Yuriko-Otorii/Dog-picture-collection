import React, { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom';


import { supabase } from './supabaseClient'

const { data: { session } } = await supabase.auth.getSession()

type Props = {
    children?: ReactNode;
};

function privateRoute({children}: Props) {
    if(!session){
        return <Navigate to={"/login"} />
    }
    return children
}

export default privateRoute