import React from "react";
import AuthContext from "../contexts/AuthProvider";

function useAuth() {
  return React.useContext(AuthContext);
}

export default useAuth;
