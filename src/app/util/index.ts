import React, { SetStateAction } from "react";
import { floor } from 'mathjs';

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

export function drawLine(context : CanvasRenderingContext2D, from : number[], to : number[], color : string, thickness : number, dashed ? : boolean) {
    const dash = [10, 4];
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.beginPath();
    if (dashed) {
        context.setLineDash(dash);
    }
    context.moveTo(from[0],from[1]);
    context.lineTo(to[0],to[1]);
    context.stroke();
    context.closePath();
    if (dashed) {
        context.setLineDash([]);
    }
}

export function drawCircle(context : CanvasRenderingContext2D, point : number[], radius : number, color : string) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(point[0], point[1], radius, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}

export function drawText(context : CanvasRenderingContext2D, text : string, where : number[], fontSize : number, font : string, color : string) {
    const fontStyle = `${fontSize}px ${font}`
    const textAsArray = text.split('\n');
    context.fillStyle = color;
    context.font = fontStyle;
    textAsArray.forEach((line, index) => {
        context.fillText(line, where[0], where[1] + index * fontSize);
    })
}

// Map a point from set limits to canvas size
export function recalculateCoordinates(context : CanvasRenderingContext2D, point : number[], limits : number[]) : number[] {
    let canvasToDraw = context.canvas;
    let newPoint : number[] = [];
    newPoint[0] = floor((point[0]-limits[1])/(limits[0]-limits[1]) * canvasToDraw.width);
    newPoint[1] = floor(canvasToDraw.height - (point[1]-limits[1])/(limits[0]-limits[1]) * canvasToDraw.height);
    return newPoint;
}

// Map a point on canvas to limits 
export function recalculateCoordinatesFromCanvasToLimits(context : CanvasRenderingContext2D, point : number[], limits : number[]) : number[] {
    let canvasWidth = context.canvas.clientWidth;
    let canvasHeight = context.canvas.clientHeight;
    return [(point[0] * (limits[0] - limits[1]) / canvasWidth) + limits[1],
            limits[0] - (point[1] * (limits[0] - limits[1]) / canvasHeight)]
}

export function getMousePositionOnCanvas(context : CanvasRenderingContext2D, event : React.MouseEvent) {
    const canvas = context.canvas;
    let boundingRectangle = canvas.getBoundingClientRect(), 
    scaleX = canvas.width / boundingRectangle.width,    
    scaleY = canvas.height / boundingRectangle.height;  

    return [
    (event.clientX - boundingRectangle.left) * scaleX,   
    (event.clientY - boundingRectangle.top) * scaleY] 
    
}