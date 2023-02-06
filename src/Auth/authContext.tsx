import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { User } from "@supabase/supabase-js";

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
      setUser(session?.user ?? null)
    }

    getSession()
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
