import { floor } from 'mathjs';
import React, { useEffect, useRef } from 'react'
import StateSpaceSystem from '../../../components/state-space-system';
import { GameCanvasContainer, GamePanel, GridLayout, LayoutColors } from '../../../style/shared-style-components';
import { clearCanvas, drawCircle, drawLine, generateBoxMullerGaussian, resizeCanvas, ToggleNavbarProps } from '../../../util';
import Filter from './filter';

function KalmanFilter({ setWhiteNavbar} : ToggleNavbarProps) : JSX.Element {
    useEffect(()=>{
        setWhiteNavbar(false);
        document.addEventListener('keypress', (e) => {
            switch (e.key) {
                case 'w':
                case 's':
                case 'a':
                case 'd':
                    command = e.key;
                    break;
                default:
                    break;
            }
        })
        document.addEventListener('keyup', ()=>{
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                command = '';
            }, 200);
        })
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) {
            requestAnimationFrame((frame)=>{render(context, frame)})
        }
    }, []) // eslint-disable-next-line

    let timeout : NodeJS.Timeout;

    let command : string = '';
    let position : number[] = [];
    let noisyPosition : number[][] = [];
    let kalmanPosition : number[][] = [];

    let amountOfPoints = 50;

    let trueStateColor : string = "#dbbe00"
    let noisyStateColor : string = "#afafaf"
    let kalmanStateColor : string = "#3f3f3f"

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const friction = 0.6;
    const mass = 1;

    let animationStart : number | null = null;

    const animationFrameDruation : number = 1000;

    const A = [[-friction, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, -friction, 0],
    [0, 0, 1, 0]];

    const B = [[1/mass, 0],
    [0, 0],
    [0, 1/mass],
    [0, 0]];

    const C = [[0, 1, 0, 0],
    [0, 0, 0, 1]];

    const dt = 0.1;

    const Qk = 0.001;

    const QkMatrix = [
        [Qk, 0, 0, 0],
        [0, Qk, 0, 0],
        [0, 0, Qk, 0],
        [0, 0, 0, Qk]
    ];

    const Rk = 0.774;
    const measurementNoiseDeviation = Math.sqrt(Rk);

    const RkMatrix = [
        [Rk, 0],
        [0, Rk]
    ];

    const system = new StateSpaceSystem(A,B,C,dt);

    system.addDisturbance(Qk);

    const kalman = new Filter(system.A, system.B, system.C, QkMatrix, RkMatrix, [[0],[0],[0],[0]], true);

    const limits : number[] = [10,-10];

    function recalculateCoordinates(context : CanvasRenderingContext2D, point : number[], limits : number[]) : number[] {
        let canvasToDraw = context.canvas;
        let newPoint : number[] = [];
        newPoint[0] = floor((point[0]-limits[1])/(limits[0]-limits[1]) * canvasToDraw.width);
        newPoint[1] = floor(canvasToDraw.height - (point[1]-limits[1])/(limits[0]-limits[1]) * canvasToDraw.height);
        return newPoint;
    }

    function update() : void {
        let input : number[][];
        switch (command){
            case 'w':
                input = [[0],[1]];
                break;
            case 's':
                input = [[0],[-1]];
                break;
            case 'a':
                input = [[-1],[0]];
                break;
            case 'd':
                input = [[1],[0]];
                break;
            default:
                input = [[0],[0]];
                break;
        }
        let output = system.step(input);
        if (Array.isArray(output[0]) && Array.isArray(output[1])) {
            position = [output[0][0], output[1][0]];
            let newNoisy = [position[0] + generateBoxMullerGaussian(measurementNoiseDeviation), position[1] + generateBoxMullerGaussian(measurementNoiseDeviation)];
            if (noisyPosition.length === amountOfPoints) {
                noisyPosition.unshift(newNoisy);
                noisyPosition.pop();
            } else {
                noisyPosition.push(newNoisy);
            }
            //console.log(kalman.PPriori);
            let kalmanResult = kalman.step(input, [[newNoisy[0]],[newNoisy[1]]]);
            if (Array.isArray(kalmanResult[0]) && Array.isArray(kalmanResult[1])) {
                let kalmanResultFormatted = [kalmanResult[0][0], kalmanResult[1][0]];
                if (kalmanPosition.length === amountOfPoints) {
                    kalmanPosition.unshift(kalmanResultFormatted);
                    kalmanPosition.pop();
                } else {
                    kalmanPosition.push(newNoisy);
                }
            }
        }
    }

    function draw(context : CanvasRenderingContext2D) : void {
        resizeCanvas(context);
        clearCanvas(context);
        
        let trueState : number[] = recalculateCoordinates(context, position, limits);
        drawLine(context, trueState, recalculateCoordinates(context, noisyPosition[0], limits), noisyStateColor, 1);
        noisyPosition.forEach((noisyVal, index)=>{
            let noisyState : number[] = recalculateCoordinates(context, noisyVal, limits);
            drawCircle(context, noisyState, 3, noisyStateColor);
            if (index !== noisyPosition.length - 1) {
               drawLine(context, 
                        noisyState,
                        recalculateCoordinates(context, noisyPosition[index + 1],limits),
                        noisyStateColor, 1); 
            }
        })

        drawCircle(context, trueState, 10, trueStateColor);

        kalmanPosition.forEach((kalmanVal, index)=>{
            let kalmanState : number[] = recalculateCoordinates(context, kalmanVal, limits);
            drawCircle(context, kalmanState, 3, kalmanStateColor);
            if (index !== kalmanPosition.length - 1) {
               drawLine(context, 
                        kalmanState,
                        recalculateCoordinates(context, kalmanPosition[index + 1],limits),
                        kalmanStateColor, 1); 
            }
        });   
            
    }

    function render(context : CanvasRenderingContext2D, frame : number) {
        if (!animationStart) {
            animationStart = frame;
        } else {
            let progress = frame - animationStart;
            if (progress < animationFrameDruation) {
                animationStart = null;
                update();
                draw(context);
            }        
        }
        requestAnimationFrame((newFrame)=>{render(context, newFrame)});
    }

    return (
        <GridLayout color={LayoutColors.Yellow}>
            <GamePanel>
                <GameCanvasContainer>
                    <canvas ref={canvasRef}></canvas>
                </GameCanvasContainer>
            </GamePanel>
        </GridLayout>
    )
}

export default KalmanFilter;