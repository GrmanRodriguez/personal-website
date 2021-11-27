import styled from "styled-components";
import { device } from "../../../media";

export const GameMenu = styled.div`
    height: min(120px, 20%);
    width: 100%;
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    place-items: center;

    @media ${device.mobileL} {
        grid-template-columns: repeat(12, 1fr);
    }
`

export const ExplanationContainer = styled.div`
    grid-column: 2/7;
    grid-row: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    & > div > span {
        font-size: 0.8em;
        font-weight: bold;
        color: var(--black);
    }

    @media ${device.mobileL} {
        grid-column: 2/12;
    }
`

export const StateShape = styled.div`
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--yellow);
`

export const MeasurementShape = styled.div`
    width: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--light-gray);
`

export const KalmanShape = styled.div`
    width: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--black);
`

export const ResetButtonContainer = styled.div`
    grid-column: 2/4;
`

export const SliderContainer = styled.div`
    grid-column: 5/8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > span {
        color: var(--black);
        font-size: 0.7em;
        text-align: center;
    }
`

export const SecondSliderContainer = styled(SliderContainer)`
    grid-column: 9/12;
`