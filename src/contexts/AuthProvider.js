import React from "react";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
