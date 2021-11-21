import { floor } from 'mathjs';
import React, { useEffect, useRef } from 'react'
import StateSpaceSystem from '../../../components/state-space-system';
import { GameCanvasContainer, GamePanel, GridLayout, LayoutColors, StyledButton, StyledSlider } from '../../../style/shared-style-components';
import { clearCanvas, drawCircle, drawLine, generateBoxMullerGaussian, resizeCanvas, ToggleNavbarProps } from '../../../util';
import Filter from './filter';
import { useMediaQuery } from 'react-responsive';
import { deviceSizes } from '../../../media';
import { GameMenu, ResetButtonContainer, SliderContainer } from './styles';

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
            reset()
            requestAnimationFrame((frame)=>{render(context, frame)})
        }
    }, []) // eslint-disable-next-line

    const isMobile = useMediaQuery({maxWidth: deviceSizes.mobileL});

    let timeout : NodeJS.Timeout;
    let enableDraw : boolean = true;

    let command : string = '';
    let position : number[] = [];
    let noisyPosition : number[][] = [];
    let kalmanPosition : number[][] = [];

    let amountOfPoints = 50;

    const trueStateColor : string = "#dbbe00"
    const noisyStateColor : string = "#afafaf"
    const kalmanStateColor : string = "#3f3f3f"

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dt = 0.1;
    const limits : number[] = [10,-10]; // Limits used for scaling canvas

    let friction = 0.6;
    let mass = 1;
    let processVariance = 0.001;
    const maxProcessVariance = 0.005;
    let measurementVariance = 0.774; 
    const maxMeasurementVariance = 3;   

    let animationStart : number | null = null;

    const animationFrameDruation : number = 1000;

    let A : number[][]; // State Matrix
    let B : number[][]; // Input Matrix
    const C = [[0, 1, 0, 0],
    [0, 0, 0, 1]]; // Observation Matrix
    let Qk : number[][] // Process Noise Covariance Matrix
    let measurementDeviation : number; 
    let Rk : number[][]; // Measurement Noise Covariance Matrix
    let system : StateSpaceSystem; // Model
    let kalman : Filter; // Kalman Filter

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
            let newNoisy = [position[0] + generateBoxMullerGaussian(measurementDeviation), position[1] + generateBoxMullerGaussian(measurementDeviation)];
            if (noisyPosition.length === amountOfPoints) {
                noisyPosition.unshift(newNoisy);
                noisyPosition.pop();
            } else {
                noisyPosition.push(newNoisy);
            }
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

    function reset() {
        noisyPosition = [];
        kalmanPosition = [];

        A = [[-friction, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, -friction, 0],
            [0, 0, 1, 0]];
        
        B = [[1/mass, 0],
            [0, 0],
            [0, 1/mass],
            [0, 0]];
        
        Qk =[[processVariance, 0, 0, 0],
            [0, processVariance, 0, 0],
            [0, 0, processVariance, 0],
            [0, 0, 0, processVariance]];

        Rk =[[measurementVariance, 0],
            [0, measurementVariance]];

        measurementDeviation = Math.sqrt(measurementVariance);

        system = new StateSpaceSystem(A,B,C,dt);
        system.addDisturbance(processVariance);

        kalman = new Filter(system.A, system.B, system.C, Qk, Rk, [[0],[0],[0],[0]], true);
    }

    function onProcessNoiseSlide(e : React.ChangeEvent<HTMLInputElement>) {
        let newProcessVariance = parseFloat(e.target.value);
        processVariance = newProcessVariance === 0 && measurementVariance === 0 ? 0.0001 : newProcessVariance;
        reset();
    }

    function onMeasurementNoiseSlide(e : React.ChangeEvent<HTMLInputElement>) {
        let newMeasurementVariance = parseFloat(e.target.value);
        measurementVariance = newMeasurementVariance === 0 && processVariance === 0 ? 0.01 : newMeasurementVariance;
        reset();
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
        <GridLayout color={LayoutColors.Yellow}>
            <GamePanel>
                <GameCanvasContainer>
                    <canvas ref={canvasRef}></canvas>
                    <GameMenu>
                        <ResetButtonContainer>
                            <StyledButton onClick={reset}>Reset</StyledButton>
                        </ResetButtonContainer>
                        <SliderContainer>
                            <span>Process Disturbance:</span>
                            <StyledSlider 
                                type="range"
                                onChange={onProcessNoiseSlide}
                                max={maxProcessVariance.toString()}
                                min="0"
                                step="0.0001"
                                defaultValue={processVariance.toString()}/>
                            {!isMobile && <br/>}
                            <span>Meas. Noise:</span>                            
                            <StyledSlider 
                                type="range"
                                onChange={onMeasurementNoiseSlide}
                                max={maxMeasurementVariance.toString()}
                                min="0"
                                step="0.01"
                                defaultValue={measurementVariance.toString()}/>
                        </SliderContainer>
                    </GameMenu>
                </GameCanvasContainer>
            </GamePanel>
        </GridLayout>
    )
}

export default KalmanFilter;