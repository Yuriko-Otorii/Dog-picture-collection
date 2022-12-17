import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

import { supabase } from "./supabaseClient";
// import { Auth } from '@supabase/ui'

type Props = {
    children?: ReactNode;
};

type AuthContextType = {
    currentUser: User | null | undefined;
}


const userContext = createContext<AuthContextType>({ currentUser: undefined })

export const AuthProvider = ({children}: Props) => {
    // const [currentUser, setCurrentUser] = useState()
    // const [session, setSession] = useState()
    // // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     supabase.auth.onAuthStateChange((event, session) => {
    //         console.log(session);
    //     })
    // })

    return (
        <></>
    )
    
}

export const useUser = () => useContext(userContext)
