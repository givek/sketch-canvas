import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

type PrivateRouteProps = {
  path: string;
  exact: boolean;
  component: React.ComponentType<any>;
};

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const auth = useAuth();

  const refresh = useRefreshToken();

  React.useEffect(() => {
    console.log("PrivateRoute useEffect");

    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        auth?.setIsLoading(false);
      }
    }

    auth?.token ? auth?.setIsLoading(false) : verifyRefreshToken();
  }, [auth, refresh]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth?.isLoading ? (
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
