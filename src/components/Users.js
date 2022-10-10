// import { Button } from "@chakra-ui/react";
import React from "react";
// import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

function Users() {
  const [users, setUsers] = React.useState();

  const axiosPrivate = useAxiosPrivate();

  const refresh = useRefreshToken();

  React.useEffect(() => {
    let isMounted = true;

    // used for cancelling requests
    const controller = new AbortController();

    async function getUsers() {
      try {
        const response = await axiosPrivate.get("/api/users/", {
          signal: controller.signal,
          // headers: { Authorization: "Bearer " + (await refresh()) },
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log("error");
        console.error("cat", error);
      }
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      {/* <Button onClick={() => refresh()}>refresh</Button> */}
    </article>
  );
}

export default Users;
