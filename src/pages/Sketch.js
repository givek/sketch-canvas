import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CreateCanvasModal } from "../components/modals/CreateCanvasModal";
import { Navbar } from "../components/Navbar";
import { useCanvas } from "../contexts/CanvasContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function fetchCurrentUser(axiosPrivate) {
  return axiosPrivate.get(`/api/users/current-user`);
}

function fetchCanvases(axiosPrivate) {
  return axiosPrivate.get(`/api/canvas`);
}

function fetchCurrentCanvas(axiosPrivate, sketchId) {
  return axiosPrivate.get(`/api/canvas/${sketchId}`);
}

function Sketch() {
  const params = useParams();

  const createCanvasModalDisclosure = useDisclosure();
  const axiosPrivate = useAxiosPrivate();

  const currentUserQuery = useQuery(["currentUser"], () =>
    fetchCurrentUser(axiosPrivate)
  );

  const canvasesQuery = useQuery(["canvases"], () =>
    fetchCanvases(axiosPrivate)
  );

  const currentCanvasQuery = useQuery(
    ["current-canvas", params?.sketchId],
    () => fetchCurrentCanvas(axiosPrivate, params?.sketchId)
  );

  const currentUser = currentUserQuery?.data?.data;
  const canvases = canvasesQuery?.data?.data;
  const currentCanvas = currentCanvasQuery?.data?.data;

  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas();

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect");
    prepareCanvas(currentUser?.color, currentCanvas?.imgBase64);
  }, [
    currentUser?.color,
    params?.sketchId,
    currentCanvas?.imgBase64,
    prepareCanvas,
  ]);

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
