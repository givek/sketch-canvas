import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function PrivateRoute({ component: Component, ...rest }) {
  const { auth, setAuth, isLoading, setIsLoading } = useAuth();

  const refresh = useRefreshToken(setAuth);

  React.useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    auth?.accessToken ? setIsLoading(false) : verifyRefreshToken();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading ? (
          auth?.accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        ) : (
          <Spinner />
        )
      }
    />
  );
}

export default PrivateRoute;
