import React from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useAuth();

  React.useEffect(() => {
    // console.log("useAxiosPrivate useEffect");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = "Bearer " + auth?.token;
          console.log(
            "reqIntercept: config Auth Headers",
            config.headers["Authorization"]
          );
        }
        // console.log("reqInter this is nice");
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("useAxiosPrivate: resIntercept Succ");
        return response;
      },
      async (error) => {
        console.log("ResIntercept: error");
        const prevRequest = error?.config;
        // console.log("prevReq", error?.response?.status, !prevRequest?.sent);
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = "Bearer " + newAccessToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
