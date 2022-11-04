import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../useAxiosPrivate";

type Canvas = {
  _id: string;
  name: string;
  owner: string;
  path: string;
  collaborators?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function useCanvases() {
  const axiosPrivate = useAxiosPrivate();

  function fetchCanvases() {
    return axiosPrivate.get<Canvas[]>(`/api/canvas`).then((res) => res.data);
  }

  return useQuery<Canvas[]>(["canvases"], () => fetchCanvases());
}

export default useCanvases;
