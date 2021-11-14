import React, { SetStateAction } from "react";

export interface ToggleNavbarProps {
    setWhiteNavbar: React.Dispatch<SetStateAction<boolean>>;
}

//Observer options for navbar, missing the callback
export let incompleteNavbarObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: `0px 0px -${Math.round(window.innerHeight*11/12)}px 0px`
}

// Helper function to prevent type errors with methods that return T | undefined types
export function ensure<T>(argument: T | undefined | null, message: string = 'Value not found in array.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
  
    return argument;
}

// Generate random variable with gaussian distribution
export function generateBoxMullerGaussian(deviation : number) : number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return deviation * (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v));
}

// Functions to draw on canvas
export function resizeCanvas(context : CanvasRenderingContext2D) {
    let canvasToResize = context.canvas;

    canvasToResize.style.width = '100%';
    canvasToResize.style.height = '100%';
    
    canvasToResize.width = canvasToResize.offsetWidth;
    canvasToResize.height = canvasToResize.offsetHeight;
}

export function clearCanvas(context : CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawLine(context : CanvasRenderingContext2D, from : number[], to : number[], color : string, thickness : number) {
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(from[0],from[1]);
    context.lineTo(to[0],to[1]);
    context.stroke();
    context.closePath();
}

export function drawCircle(context : CanvasRenderingContext2D, point : number[], radius : number, color : string) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(point[0], point[1], radius, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}