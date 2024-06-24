import React, { useState, useEffect, useRef } from "react";
import images from "../../constants/images";
import "./WhiteboardWindow.css";

function WhiteboardWindow() {
    const canvasRef = useRef(null);
    const parentRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [tool, setTool] = useState("pencil"); // added tool state
    const [cursor, setCursor] = useState("url('https://img.icons8.com/?size=30&id=11737&format=png&color=000000') 0 30, auto"); // added cursor state
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canv = canvasRef.current;
    canv.width = window.innerWidth * 0.5;
    canv.height = window.innerHeight * 0.4;
    const offset = canv.getBoundingClientRect();
    setCanvasOffset({ x: offset.left, y: offset.top});
    console.log(canv.width, canv.height);
    const canvCtx = canv.getContext("2d");
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";
    canvCtx.lineWidth = 5;
    setCtx(canvCtx);
  }, []);
  

  const handleMouseDown = (e) => {
    setDrawing(true);
    setPosition({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  function handleMouseMove(e) {
    const mousex = e.clientX - canvasOffset.x;
    const mousey = e.clientY - canvasOffset.y;
    if (drawing) {
      if (tool === "pencil") {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(mousex, mousey);
        ctx.stroke();
      } else if (tool === "eraser") {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(mousex, mousey);
        ctx.stroke();
      }
    }
    setPosition({ x: mousex, y: mousey });
  }

  function handleToolChange(tool) {
    setTool(tool);
    if (tool === "pencil") {
      setCursor("url('https://img.icons8.com/?size=30&id=11737&format=png&color=000000') 0 30, auto");
    } else if (tool === "eraser") {
      setCursor("url('https://img.icons8.com/?size=30&id=1061&format=png&color=000000') 0 30, auto");
    }
  }

  const erase = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="board">
      <canvas
        ref={canvasRef}
        className="whiteboardCanvas"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: cursor }} // added cursor style
      />
      <button className="submitButton" onClick={() => handleToolChange("pencil")}>
        Pencil
      </button>
      <button className="submitButton" onClick={() => handleToolChange("eraser")}>
        Eraser
      </button>
      <button className="submitButton" onClick={erase}>Erase All</button>
    </div>
  );
}

export default WhiteboardWindow;
