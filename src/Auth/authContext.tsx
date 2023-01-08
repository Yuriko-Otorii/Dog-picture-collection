import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { Session, User } from "@supabase/supabase-js";

import { Navigate } from "react-router-dom";

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
    async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

//https://www.misha.wtf/blog/nextjs-supabase-auth

//https://ruanmartinelli.com/posts/supabase-authentication-react/
