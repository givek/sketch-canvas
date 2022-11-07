import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type CurrentUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
};

function useCurrentUser() {
  const axiosPrivate = useAxiosPrivate();

  function fetchCurrentUser() {
    return axiosPrivate
      .get<CurrentUser>(`/api/users/current-user`)
      .then((res) => res.data);
  }

  return useQuery<CurrentUser>(["currentUser"], () => fetchCurrentUser());
}

export default useCurrentUser;
