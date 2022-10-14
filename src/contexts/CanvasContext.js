import { useMutation } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const axiosPrivate = useAxiosPrivate();
  const updateCurrentCanvasQuery = useMutation((newCanvas) =>
    axiosPrivate.patch(`api/canvas`, newCanvas)
  );

  const prepareCanvas = React.useCallback((strokeStyle, currentCanvas) => {
    console.log("Prepare Canvas");
    const canvas = canvasRef.current;
    canvas.width = 1120 * 2;
    canvas.height = 767 * 2;
    canvas.style.width = `1120px`;
    canvas.style.height = `767px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    // context.strokeStyle = "black";
    // console.log("color", strokeStyle);
    context.strokeStyle = strokeStyle ? strokeStyle : "black";
    context.lineWidth = 3;
    contextRef.current = context;

    if (currentCanvas) {
      // const canvas = canvasRef.current;

      // const context = canvas.getContext("2d");
      clearCanvas();
      const image = new Image();
      image.onload = function () {
        context.drawImage(image, 0, 0, 1120, 767);
      };

      image.src = currentCanvas;
    }
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = (currentCanvas) => {
    contextRef.current.closePath();

    setIsDrawing(false);

    const newCanvas = canvasRef.current.toDataURL();
    console.log("new Canvas", newCanvas);

    updateCurrentCanvasQuery.mutate({
      canvasId: currentCanvas._id,
      imgBase64: newCanvas,
    });
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    // contextRef.current.strokeRect(500, 500, 50, 60);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
