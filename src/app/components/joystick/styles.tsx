import styled, {css} from 'styled-components'

export const JoyStickContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 7em;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--yellow);
    box-shadow: 0px 4px 15px -1px var(--gray);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    overflow: hidden;
`

const triangleSize : number = 22;

const triangle = css`
    width: ${triangleSize}px;
    aspect-ratio: 1;
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
    background-color: var(--yellow);
    box-shadow: inset 0px 2px 10px -1px var(--black);
    position: absolute;
    top: 50%;
    margin-top: -${triangleSize/2}px;
    left: 50%;
    margin-left: -${triangleSize/2}px;
`

const JoyStickButton = styled.button`
    box-shadow: 0px 4px 15px -1px var(--gray);
    background-color: var(--yellow);
    position: relative;
    transition: filter var(--animation-slower);

    &:active, &:hover {
        filter: brightness(120%);
    }

    &::after {
        content: "";
        ${triangle};
    }
`

export const JoyStickUpButton = styled(JoyStickButton)`
    grid-column: 2;
    grid-row: 1;
`

export const JoyStickLeftButton = styled(JoyStickButton)`
    grid-column: 1;
    grid-row: 2;

    &::after {
        transform: rotate(-90deg);
    }
`
export const JoyStickRightButton = styled(JoyStickButton)`
    grid-column: 3;
    grid-row: 2;

    &::after {
        transform: rotate(90deg);
    }
`

export const JoyStickDownButton = styled(JoyStickButton)`
    grid-column: 2;
    grid-row: 3;

    &::after {
        transform: rotate(180deg);
    }
`

export const JoyStickButtonCover = styled.div`
    grid-column: 2;
    grid-row: 2;

    background-color: var(--yellow);
    z-index: 1;
`