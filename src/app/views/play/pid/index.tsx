import math from 'mathjs';
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive';
import JoyStick from '../../../components/joystick';
import StateSpaceSystem from '../../../components/state-space-system';
import { deviceSizes } from '../../../media';
import { GameCanvasContainer, GameExplanation, GamePanel, GameTitle, GridLayout, LayoutColors, StyledButton, StyledSlider } from '../../../style/shared-style-components'
import { clearCanvas, drawCircle, drawLine, drawText, getMousePositionOnCanvas, recalculateCoordinates, recalculateCoordinatesFromCanvasToLimits, resizeCanvas, ToggleNavbarProps } from '../../../util'
import { GameMenu, ResetButtonContainer, SecondSliderContainer, SliderContainer } from '../kalman-filter/styles';
import { firstImage, firstParagraph, fifthParagraph, fourthParagraph, thirdParagraph, lastParagraph, secondImage, secondParagraph, seventhParagraph, sixthParagrah } from './explanation';
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

    const isMobile = useMediaQuery({ maxWidth: deviceSizes.mobileL });

    const canvasFontSize = isMobile ? 10 : 17;
    
    const enableDraw : boolean = true;

    let animationStart : number | null = null;
    let animationFrameDruation : number = 100;

    const setpointColor : string = "#3f3f3f";
    const stateColor : string = "#dbbe00";
    const previousStatesColor : string = "#807100"

    const limits : number[] = [10,-10];
    const currentStateXPosition : number = 0;

    const mass : number = 1;
    const friction : number = 0.1;
    const dt : number = 0.01;

    const A : number[][] = [[-friction, 0],
                            [1, 0]];
    const B : number[][] = [[1/mass],
                            [0]];
    const C : number[][] = [[1, 0],
                            [0, 1]];
    const initialState : number[][] = [[0],[limits[1]]];

    let isStable : boolean = true;
    const stabilityLimit : number = 100;

    let system : StateSpaceSystem;
    let currentState : math.MathArray = [];
    let firstIteration : boolean;

    let kp : number = 45;
    const maxKp : number = 70;
    let ki : number = 30;
    const maxKi : number = 70;
    let kd : number = 55;
    const maxKd : number = 70;

    let setpointChange : number = 0;
    const deltaSetpoint : number = 0.2;

    let pid : PID;

    const amountOfPoints : number = 20;
    let previousStates : number[];

    let isMouseDown : boolean = false;
    let initialMousePosition : number[] = [-1,-1];
    let initialSetpoint : number = 100;

    const howToPlayDesktop : JSX.Element = <span>Drag the gain sliders and the setpoint bar to see the controller response!</span>
    const howToPlayMobile : JSX.Element = <span>Drag the gain sliders and use the joystick to move the setpoint and see the controller response!</span>

    let setpoint : number = 2;

    function reset() : void {
        system = new StateSpaceSystem(A, B, C, dt, initialState);
        pid = new PID(dt);

        isStable = true;

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
        const setpointTextXPosition = isMobile ? 1 : 3;
        drawText(context, `Current Setpoint: ${setpoint.toFixed(2)}`, recalculateCoordinates(context, [setpointTextXPosition, setpoint + 0.6], limits), canvasFontSize, 'Poppins', setpointColor);
    }

    function drawCurrentState(context : CanvasRenderingContext2D) {
        drawCircle(context,
            recalculateCoordinates(context, [currentStateXPosition, returnStateAsScalar(currentState)], limits), 10, stateColor);     
        
        const stateTextPosition = isMobile ? [6, -3] : [7, -7];

        drawText(context,
                `Kp: ${kp.toFixed(2)}\n\nKi: ${ki.toFixed(2)}\n\nKd: ${kd.toFixed(2)}\n`,
                recalculateCoordinates(context, stateTextPosition, limits),
                canvasFontSize,
                'Poppins',
                setpointColor);

        drawText(context,
                `Position: ${returnStateAsScalar(currentState).toFixed(3)}`,
                recalculateCoordinates(context, [-9, 9], limits),
                canvasFontSize,
                'Poppins',
                setpointColor);
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

    function drawUnstableMessage(context : CanvasRenderingContext2D) {
        drawText(context, 
            "Wow! It seems you made the\nsystem unstable 🥺.\nSet different gains and press\nthe Reset button!",
            recalculateCoordinates(context, [limits[1], 1], limits), canvasFontSize + 3, 'Poppins', setpointColor);
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

    function handleKpSlide(event : React.ChangeEvent<HTMLInputElement>) {
        kp = parseFloat(event.target.value);
    }

    function handleKiSlide(event : React.ChangeEvent<HTMLInputElement>) {
        ki = parseFloat(event.target.value);
    }

    function handleKdSlide(event : React.ChangeEvent<HTMLInputElement>) {
        kd = parseFloat(event.target.value);
    }

    function handleJoystickUpPress() {
        setpointChange = deltaSetpoint;
    }

    function handleJoystickDownPress() {
        setpointChange = -deltaSetpoint;
    }

    function handleJoystickRelease() {
        setpointChange = 0;
    }

    function update() {
        addStateToArray(returnStateAsScalar(currentState));
        setpoint += setpointChange;
        pid.setSetpoint(setpoint);
        pid.setGains(kp, ki, kd);
        const measurement = firstIteration ? initialState[1][0] : returnStateAsScalar(currentState);
        if (firstIteration) firstIteration = false;
        const input = pid.step(measurement);
        currentState = system.step([[input]]);
        if (Math.abs(returnStateAsScalar(currentState)) > stabilityLimit) {
            isStable = false;
        }
    }

    function draw(context : CanvasRenderingContext2D) {
        resizeCanvas(context);
        clearCanvas(context);
        if (isStable) {
            drawSetpoint(context);
            drawPreviousStates(context);
            drawCurrentState(context);     
        } else {
            drawUnstableMessage(context);
        }
           
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
                        <SliderContainer>
                            <span>Kp:</span>
                            <StyledSlider
                                type="range"
                                onChange={handleKpSlide}
                                max={maxKp.toString()}
                                min="0"
                                step="0.1"
                                defaultValue={kp.toString()}/>
                            <span>Ki:</span>
                            <StyledSlider
                                type="range"
                                onChange={handleKiSlide}
                                max={maxKi.toString()}
                                min="0"
                                step="0.1"
                                defaultValue={ki.toString()}/>
                        </SliderContainer>
                        <SecondSliderContainer>
                            <span>Kd:</span>
                            <StyledSlider
                                type="range"
                                onChange={handleKdSlide}
                                max={maxKd.toString()}
                                min="0"
                                step="0.1"
                                defaultValue={kd.toString()}/>
                        </SecondSliderContainer>
                    </GameMenu>
                </GameCanvasContainer>
                <GameExplanation>
                    <b>{isMobile ? howToPlayMobile : howToPlayDesktop }</b>
                    {firstParagraph}
                    {secondParagraph}
                    {thirdParagraph}
                    {firstImage}
                    {fourthParagraph}
                    {fifthParagraph}
                    {sixthParagrah}
                    {seventhParagraph}
                    {secondImage}
                    {lastParagraph}
                </GameExplanation>
            </GamePanel>
            {isMobile && 
            <JoyStick onUp={handleJoystickUpPress}
                    onDown={handleJoystickDownPress}
                    onRelease={handleJoystickRelease}/>}
        </GridLayout>
    </>)
}

export default PIDController;