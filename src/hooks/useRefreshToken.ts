import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const auth = useAuth();

  // console.log("useRefreshToken setAuth: ", setAuth);

  const refresh = async () => {
    const response = await axios.post("/api/session/refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log("Set Refesh Token");
    auth?.setAuth(response.data.accessToken);

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
