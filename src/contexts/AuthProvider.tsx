import React from "react";

type AuthContextType = {
  auth: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthProviderProps = { children?: React.ReactNode };

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider(props: AuthProviderProps) {
  const [auth, setAuth] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
