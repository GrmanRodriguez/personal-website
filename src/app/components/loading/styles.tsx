import styled from 'styled-components'

export const LoadingDotsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    grid-column: 6/8;
    grid-row: 6/8;
`

export const LoadingDots = styled.div`
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--black);
    color: var(--black);

    &::before, &::after {
        content: '';
        display: inline-block;
        position: absolute;
    }

    &::before {
        left: 0;
        top: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: var(--black);
        color: var(--black);
        transform-origin: 5px 20px;
        animation: dotRevolution 1.4s linear infinite;
    }

    &::after {
        left: 0;
        top: -30px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: var(--black);
        color: var(--black);
        transform-origin: 5px 35px;
        animation: dotRevolution 1s linear infinite;
    }

    @keyframes dotRevolution {
    0% {
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    100% {
        transform: rotateZ(360deg) translate3d(0, 0, 0);
    }
    }
`