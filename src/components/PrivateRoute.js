import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function PrivateRoute({ component: Component, ...rest }) {
  const { auth, isLoading, setIsLoading } = useAuth();

  const refresh = useRefreshToken();

  React.useEffect(() => {
    console.log("PrivateRoute useEffect");

    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    auth ? setIsLoading(false) : verifyRefreshToken();
  }, [auth, setIsLoading, refresh]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading ? (
          auth ? (
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
