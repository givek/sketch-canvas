import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const auth = useAuth();

  // console.log("useRefreshToken setAuth: ", setAuth);

  const refresh = async () => {
    console.log("start refresh");

    try {
      // second parameter of the axios post req is the req body.
      const response = await axios.post(
        "/api/session/refresh",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      auth?.setAuth(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("useRefreshToken-refresh error", error);
    }
  };

  return refresh;
}

export default useRefreshToken;
