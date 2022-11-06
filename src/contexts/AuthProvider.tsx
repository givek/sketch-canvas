import React, { useMemo } from "react";

type AuthContextType = {
  token: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthProviderProps = { children?: React.ReactNode };

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider(props: AuthProviderProps) {
  const [token, setAuth] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const auth = useMemo(
    () => ({
      token,
      setAuth,
      isLoading,
      setIsLoading,
    }),
    [token, setAuth, isLoading, setIsLoading]
  );

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
