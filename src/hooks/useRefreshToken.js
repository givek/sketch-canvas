import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  // console.log("useRefreshToken setAuth: ", setAuth);

  const refresh = async () => {
    const response = await axios.post(
      "/api/session/refresh",
      {},
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    setAuth((prev) => {
      console.log("Prev", prev);
      console.log("Curr", response.data);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
