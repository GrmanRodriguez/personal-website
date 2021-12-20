import math from 'mathjs';
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import StateSpaceSystem from '../../../components/state-space-system';
import { GameCanvasContainer, GamePanel, GameTitle, GridLayout, LayoutColors, StyledButton } from '../../../style/shared-style-components'
import { ToggleNavbarProps } from '../../../util'
import { GameMenu, ResetButtonContainer } from '../kalman-filter/styles';
import PID from './pid';


function PIDController({setWhiteNavbar} : ToggleNavbarProps ) : JSX.Element {
    useEffect(()=>{
        setWhiteNavbar(false);
        const context = canvasRef.current?.getContext('2d');
        if (context) {

        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const limits = [-10,10];

    const mass : number = 1;
    const friction : number = 0.6;
    const dt : number = 0.01;

    const A : number[][] = [[-friction, 0],
                            [1, 0]];
    const B : number[][] = [[1/mass],
                            [0]];
    const C : number[][] = [[1, 0],
                            [0, 1]];
    const initialState : number[][] = [[0],[limits[0]]];

    let system : StateSpaceSystem;
    let currentState : math.MathArray;
    let firstIteration : boolean;

    let kp : number = 1;
    let ki : number = 0;
    let kd : number = 4;

    let pid : PID;

    const amountOfPoints : number = 20;
    let previousStates : number[];

    let setpoint : number;

    function reset() : void {
        system = new StateSpaceSystem(A, B, C, dt, initialState);
        pid = new PID(dt);

        previousStates = [];
        setpoint = 2;

        pid.setSetpoint(setpoint);

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

    function update() {
        addStateToArray(returnStateAsScalar(currentState));
        const measurement = firstIteration ? initialState[1][0] : returnStateAsScalar(currentState);
        if (firstIteration) firstIteration = false;
        const input = pid.step(measurement);
        currentState = system.step([[0],[input]]);
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
                    <canvas ref={canvasRef}/>
                    <GameMenu>
                        <ResetButtonContainer>
                            <StyledButton>Reset</StyledButton>
                        </ResetButtonContainer>
                    </GameMenu>
                </GameCanvasContainer>
            </GamePanel>
        </GridLayout>
    </>)
}

export default PIDController;