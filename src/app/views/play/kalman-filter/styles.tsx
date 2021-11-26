import styled from "styled-components";

export const GameMenu = styled.div`
    height: min(120px, 20%);
    width: 100%;
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    place-items: center;
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

    & > span {
        font-size: 0.7em;
    }
`

export const SecondSliderContainer = styled(SliderContainer)`
    grid-column: 9/12;
`