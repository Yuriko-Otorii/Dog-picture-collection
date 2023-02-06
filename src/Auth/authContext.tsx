import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { Session, User } from "@supabase/supabase-js";

import { useNavigate } from "react-router-dom";

import { supabase } from "./supabaseClient";

type Props = {
  children?: ReactNode;
};

type ContextProps = {
  user: any | null;
};

const AuthContext = createContext<Partial<ContextProps>>({user: null});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: {session} } = await supabase.auth.getSession()
      // console.log(session?.user)
      setUser(session?.user ?? null)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
    })

    // (async () => {
    //   const { data: { session: currentUserSession } } = await supabase.auth.getSession()
    //   setUser(currentUserSession!.user);
    // })();
  }, []);

  return (
    <>
    {/* {console.log(user)} */}
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
    </>
  );
};

//https://www.misha.wtf/blog/nextjs-supabase-auth

//https://ruanmartinelli.com/posts/supabase-authentication-react/




//https://supabase.com/docs/guides/functions/auth
