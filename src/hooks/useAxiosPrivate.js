import React, { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = "Bearer " + auth?.accessToken;
          console.log(config.headers["Authorization"]);
        }
        console.log("reqInter this is nice");
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("henlo response");
        const prevRequest = error?.config;
        console.log("prevReq", error?.response?.status, !prevRequest?.sent);
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

// function useAxiosPrivate() {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth;

//   React.useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//       (config) => {
//         console.log("axiosprivate reqInter coinfg");
//         if (!config.headers["Authorization"]) {
//           console.log("axiosprivate reqInter !coinfg");

//           config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;

//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           prevRequest.sent = true;

//           const newAccessToken = await refresh();

//           prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//           return axiosPrivate(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return axiosPrivate;
// }

// export default useAxiosPrivate;
