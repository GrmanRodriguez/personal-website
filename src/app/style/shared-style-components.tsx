import styled from 'styled-components';
import { device } from '../media';

export enum LayoutColors {
    White = "var(--white)",
    Gray = "var(--gray)",
    Yellow = "var(--yellow)"
}

interface GridLayoutProps {
    color?: LayoutColors
}

export const GridLayout = styled.div<GridLayoutProps>`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.color || "var(--white)"};
    color: ${props => 
        props.color && props.color === LayoutColors.Gray ?
        "var(--white)" : "var(--black)"};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
`

export const FlexLayout = styled(GridLayout)`
    display: flex;
    min-height: 100vh;
    height: auto;
    flex-direction: column;
    align-items: center;

    > *:first-child {
        margin-top: ${window.innerHeight / 12}px;
    }
`

export const SubSectionTitle = styled.div`
    font-weight: normal;
    font-size: 2.5em;
    grid-row: 2/4;
    grid-column: 5/9;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    text-align: center;
`

export const FlexSubSectionTitle = styled(SubSectionTitle)`
    grid-row: none;
    grid-column: none;
    width: 70%;
    height: ${Math.round(window.innerHeight / 12)}px;
`

interface StyledButtonProps {
    bold?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
    padding: 5px 15px;
    background-color: var(--yellow);
    max-width: fit-content;
    color: var(--black);
    font-weight: ${props => props.bold ? "600" : "normal"};
    border-radius: 10px;
    border: 0px;
    box-shadow: 0px 4px 15px -1px var(--gray);
    transition: transform var(--animation), filter var(--animation);

    :hover {
        cursor: pointer;
        transform: scale(1.1);
        filter: brightness(120%);
    }
`

export const StyledSlider = styled.input`
    & {
        width: 100%;
    }

    &,
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    &::-webkit-slider-thumb {
        height: 16px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--yellow);
        cursor: pointer;
        box-shadow: 0px 2px 5px -1px var(--gray);
        transition: transform var(--animation), filter var(--animation), box-shadow var(--animation);
        margin-top: -4px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    }

    &:focus::-webkit-slider-thumb,
    &:hover::-webkit-slider-thumb {
        transform: scale(1.3);
        filter: brightness(120%);
        box-shadow: 0px 2px 5px -1px var(--black);
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px;
        cursor: pointer;
        box-shadow: 0px 2px 5px -1px var(--black);
        background: var(--light-gray);
        border-radius: 1000000px;
    }
`

export const GamePanel = styled.div`
    grid-column: 2/12;
    grid-row: 3/12;
    background-color: var(--white);
    color: var(--white);
    box-shadow: 0px 4px 15px -1px var(--gray);
    border-radius: 10px;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr); 
`;

export const GameCanvasContainer = styled.div`
    grid-column: 2/7;
    grid-row: 2/12;
    border: 1px solid var(--gray);
    position: relative;

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 2/8;
    }
`
export const GameTitle = styled.h2`
    grid-column: 8/12;
    grid-row: 2;
    font-size: 3em;
    color: var(--black);
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 8;
        font-size: 2em;
    }
`

export const GameExplanation = styled.div`
    grid-column: 7/13;
    grid-row: 3/12;
    overflow-y: auto;
    color: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    margin-left: 5%;

    text-align: justify;

    & > * {
        margin-top: 0;
        margin-bottom: 1em;
    }

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 9/12;
        font-size: 0.9em;
        width: 100%;
        margin-left: 0;
    }

    a {
      text-decoration: none; 
      color: var(--yellow);
      transition: filter var(--animation-slower); 
      filter: brightness(80%);      
    }

    a:visited {
        filter: brightness(60%);
    }

    a:hover, a:active {
        filter: brightness(100%);
    }
`