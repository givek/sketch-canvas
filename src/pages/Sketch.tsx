import { Box, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CreateCanvasModal } from "../components/modals/CreateCanvasModal";
import { CurrentCanvas, Navbar } from "../components/Navbar";
import { useCanvas } from "../contexts/CanvasContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCurrentUser from "../hooks/query/useCurrentUser";
import useCanvases from "../hooks/query/canvas/useCanvases";
import React from "react";

// function fetchCurrentUser(axiosPrivate) {
//   return axiosPrivate.get(`/api/users/current-user`);
// }

function Sketch() {
  const params = useParams<{ sketchId: string }>();

  const createCanvasModalDisclosure = useDisclosure();
  const axiosPrivate = useAxiosPrivate();

  // function fetchCanvases() {
  //   return axiosPrivate.get(`/api/canvas`);
  // }

  function fetchCurrentCanvas(sketchId: string) {
    return axiosPrivate.get(`/api/canvas/${sketchId}`).then((res) => res.data);
  }

  // const currentUserQuery = useQuery(["currentUser"], () =>
  //   fetchCurrentUser(axiosPrivate)
  // );

  const currentUserQuery = useCurrentUser();

  // const canvasesQuery = useQuery(["canvases"], () =>
  //   fetchCanvases(axiosPrivate)
  // );

  const canvasesQuery = useCanvases();

  const currentCanvasQuery = useQuery<CurrentCanvas>(
    ["current-canvas", params.sketchId],
    () => fetchCurrentCanvas(params.sketchId)
  );

  const currentUser = currentUserQuery?.data;
  const canvases = canvasesQuery?.data || [];
  const currentCanvas = currentCanvasQuery?.data;

  console.log({ canvases });

  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  // return <div>helo</div>;

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect");
    if (currentCanvas && currentUser) {
      prepareCanvas(currentUser.color, currentCanvas.imgBase64);
    }
  }, [
    currentUser?.color,
    params.sketchId,
    currentCanvas?.imgBase64,
    prepareCanvas,
  ]);

  if (
    currentUserQuery.isLoading ||
    canvasesQuery.isLoading ||
    !currentCanvas ||
    !currentUser
  ) {
    return <div>Loading</div>;
  }

  return (
    <Box bgColor="#F5F5F5" height="100vh">
      <CreateCanvasModal
        isOpen={createCanvasModalDisclosure.isOpen}
        onClose={createCanvasModalDisclosure.onClose}
      />
      <Navbar
        onOpen={createCanvasModalDisclosure.onOpen}
        canvases={canvases}
        owner={currentUser}
        currentSketchId={params?.sketchId}
        currentCanvas={currentCanvas}
      />
      <Box px="94px" py="78px">
        <canvas
          id="canvas"
          style={{ background: "#FFFFFF" }}
          width="1120"
          height="767"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={() => finishDrawing(currentCanvas)}
          onMouseMove={draw}
        ></canvas>
      </Box>
    </Box>
  );
}

export default Sketch;
