import React, { createRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CurrentCanvas } from "../components/Navbar";

type CanvasContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  prepareCanvas: (strokeStyle: string, currentCanvas: string) => void;
  startDrawing: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  finishDrawing: (currentCanvas: CurrentCanvas) => void;
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  clearCanvas: () => void;
};

type CanvasProviderProps = { children?: React.ReactNode };

type UpdateCanvas = {
  canvasId: string;
  imgBase64: string;
};

const CanvasContext = React.createContext<CanvasContextType>({
  canvasRef: createRef(),
  contextRef: createRef(),
  prepareCanvas: (strokeStyle: string, currentCanvas: string) => {
    return;
  },
  startDrawing: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    return;
  },
  finishDrawing: (currentCanvas: CurrentCanvas) => {
    return;
  },
  draw: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    return;
  },
  clearCanvas: () => {
    return;
  },
});

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const queryClient = useQueryClient();

  const axiosPrivate = useAxiosPrivate();
  const updateCurrentCanvasQuery = useMutation<any, any, UpdateCanvas>(
    (newCanvas) => axiosPrivate.patch(`api/canvas`, newCanvas),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["current-canvas", data.data._id]);
      },
    }
  );

  const prepareCanvas = React.useCallback(
    (strokeStyle: string, currentCanvas: string) => {
      console.log("Prepare Canvas");
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.width = 1120 * 2;
        canvas.height = 767 * 2;
        canvas.style.width = `1120px`;
        canvas.style.height = `767px`;
        const context = canvas.getContext("2d");

        if (context) {
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
        }
      }
    },
    []
  );

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { offsetX, offsetY } = event.nativeEvent;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = (currentCanvas: CurrentCanvas) => {
    contextRef.current?.closePath();

    setIsDrawing(false);

    const newCanvas = canvasRef.current?.toDataURL();
    console.log("new Canvas", newCanvas);

    updateCurrentCanvasQuery.mutate({
      canvasId: currentCanvas._id,
      imgBase64: newCanvas || "",
    });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();

    // contextRef.current.strokeRect(500, 500, 50, 60);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
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

export const useCanvas = () => React.useContext(CanvasContext);
