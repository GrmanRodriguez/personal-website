import math from 'mathjs';
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import StateSpaceSystem from '../../../components/state-space-system';
import { GameCanvasContainer, GamePanel, GameTitle, GridLayout, LayoutColors, StyledButton } from '../../../style/shared-style-components'
import { clearCanvas, drawCircle, drawLine, getMousePositionOnCanvas, recalculateCoordinates, recalculateCoordinatesFromCanvasToLimits, resizeCanvas, ToggleNavbarProps } from '../../../util'
import { GameMenu, ResetButtonContainer } from '../kalman-filter/styles';
import PID from './pid';


function PIDController({setWhiteNavbar} : ToggleNavbarProps ) : JSX.Element {
    useEffect(()=>{
        setWhiteNavbar(false);
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            reset()
            requestAnimationFrame(frame => render(context, frame));
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const enableDraw : boolean = true;

    let animationStart : number | null = null;
    let animationFrameDruation : number = 100;

    const setpointColor : string = "#3f3f3f";
    const stateColor : string = "#dbbe00";
    const previousStatesColor : string = "#807100"

    const limits : number[] = [10,-10];
    const currentStateXPosition : number = 0;

    const mass : number = 1;
    const friction : number = 0.6;
    const dt : number = 0.01;

    const A : number[][] = [[-friction, 0],
                            [1, 0]];
    const B : number[][] = [[1/mass],
                            [0]];
    const C : number[][] = [[1, 0],
                            [0, 1]];
    const initialState : number[][] = [[0],[limits[1]]];

    let system : StateSpaceSystem;
    let currentState : math.MathArray;
    let firstIteration : boolean;

    let kp : number = 1;
    let ki : number = 0;
    let kd : number = 4;

    let pid : PID;

    const amountOfPoints : number = 15;
    let previousStates : number[];

    let isMouseDown : boolean = false;
    let initialMousePosition : number[] = [-1,-1];
    let initialSetpoint : number = 100;

    let setpoint : number;

    function reset() : void {
        system = new StateSpaceSystem(A, B, C, dt, initialState);
        pid = new PID(dt);

        currentState = initialState;

        previousStates = [];
        setpoint = 2;

        pid.setSetpoint(setpoint);
        pid.setGains(kp, ki, kd);

        firstIteration = true;
    }

    function addStateToArray(state : number) {
        previousStates.unshift(state);
        if (previousStates.length > amountOfPoints) {
            previousStates.pop();
        }
    }

    function returnStateAsScalar(state : math.MathArray) : number {
        if (Array.isArray(state[1])) {
            return state[1][0]
        } else {
            return 0
        }
    }

    function drawSetpoint(context : CanvasRenderingContext2D) {
        drawLine(context, 
            recalculateCoordinates(context, [limits[0], setpoint], limits), 
            recalculateCoordinates(context, [limits[1], setpoint], limits), setpointColor, 3, true);
    }

    function drawCurrentState(context : CanvasRenderingContext2D) {
        drawCircle(context,
            recalculateCoordinates(context, [currentStateXPosition, returnStateAsScalar(currentState)], limits), 10, stateColor);     
    }

    function drawPreviousStates(context : CanvasRenderingContext2D) {
        const deltaX = (currentStateXPosition - limits[1])/(amountOfPoints);
        drawLine(context,
            recalculateCoordinates(context, [currentStateXPosition, returnStateAsScalar(currentState)], limits),
            recalculateCoordinates(context, [currentStateXPosition - deltaX, previousStates[0]], limits),previousStatesColor, 1);
        previousStates.forEach((previousState, index) => {
            drawCircle(context,
                recalculateCoordinates(context, [currentStateXPosition - (index + 1) * deltaX, previousState], limits), 5, previousStatesColor)
            if (index < previousStates.length) {
                drawLine(context,
                    recalculateCoordinates(context, [currentStateXPosition - (index + 1) * deltaX, previousState], limits),
                    recalculateCoordinates(context, [currentStateXPosition - (index + 2) * deltaX, previousStates[index + 1]], limits),
                    previousStatesColor, 1);
            }            
        })
    }

    function handleMouseMove(event : React.MouseEvent<HTMLCanvasElement>) {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            const mouseCoordinates = recalculateCoordinatesFromCanvasToLimits(context, getMousePositionOnCanvas(context, event), limits);
            if (setpoint - 0.5 < mouseCoordinates[1] && mouseCoordinates[1] < setpoint + 0.5) {
                context.canvas.style.cursor = 'move';
            } else {
                context.canvas.style.cursor = '';
            }
            if (isMouseDown && initialSetpoint - 0.5 < initialMousePosition[1] && initialMousePosition[1] < initialSetpoint + 0.5) {
                setpoint = mouseCoordinates[1];
            }
        }
    }

    function handleMouseDown(event : React.MouseEvent<HTMLCanvasElement>) {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            initialMousePosition = recalculateCoordinatesFromCanvasToLimits(context, getMousePositionOnCanvas(context, event), limits);
            initialSetpoint = setpoint;
        }
        isMouseDown = true;
    }

    function handleMouseUp(event : React.MouseEvent<HTMLCanvasElement>) {
        isMouseDown = false;
    }

    function update() {
        addStateToArray(returnStateAsScalar(currentState));
        pid.setSetpoint(setpoint);
        const measurement = firstIteration ? initialState[1][0] : returnStateAsScalar(currentState);
        if (firstIteration) firstIteration = false;
        const input = pid.step(measurement);
        currentState = system.step([[input]]);
    }

    function draw(context : CanvasRenderingContext2D) {
        resizeCanvas(context);
        clearCanvas(context);
        drawSetpoint(context);
        drawPreviousStates(context);
        drawCurrentState(context);        
    }

    function render(context : CanvasRenderingContext2D, frame : number) {
        if (enableDraw) {
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
    }

    return (
    <>
        <Helmet>
            <title>PID Controller | Germán Rodriguez</title>
        </Helmet>
        <GridLayout color={LayoutColors.Yellow}>
            <GamePanel>
                <GameTitle>PID Controller</GameTitle>
                <GameCanvasContainer>
                    <canvas onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseDown={handleMouseDown} ref={canvasRef}/>
                    <GameMenu>
                        <ResetButtonContainer>
                            <StyledButton onClick={reset}>Reset</StyledButton>
                        </ResetButtonContainer>
                    </GameMenu>
                </GameCanvasContainer>
            </GamePanel>
        </GridLayout>
    </>)
}

export default PIDController;