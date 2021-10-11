import styled from 'styled-components';
import { device } from '../../media';

export const DemosPanel = styled.div`
    width: 70%;
    min-height: 450px;
    border-radius: 15px;
    background-color: var(--white);
    box-shadow: 0px 4px 15px -5px var(--black);

    @media ${device.mobileL} {
        min-height: 600px;
        width: 90%;
    }
`

interface DemoContainerProps {
    last? : boolean
}

export const DemoContainer = styled.div<DemoContainerProps>`
    width: 100%;
    height: 450px;
    border-bottom: ${props => props.last ? '' : '1px solid var(--black)'};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);

    @media ${device.mobileL} {
        height: 600px;
    }
`

export const DemoName = styled.h2`
    grid-column: 2/5;
    grid-row: 1;

    @media ${device.mobileL} {
        grid-column: 1/12;
        text-align: center;
    }
`

interface DemoImageProps {
    src: string;
}

const DemoImageDiv = styled.div`
    grid-column: 2/6;
    grid-row: 2/12;

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 2/7;
    }
` 

const DemoImageImg = styled.img`
    object-fit: cover;
    width: 100%;
    max-height: 100%;
`
export const DemoImage = function( {src} : DemoImageProps ) : JSX.Element {
    return (
        <DemoImageDiv>
            <DemoImageImg src={src} />
        </DemoImageDiv>
    )
}

export const GoToDemoButtonContainer = styled.div`
    grid-column: 9/11;
    grid-row: 11;

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 12;
        display: grid;
        place-items: center;

        a {
            width: 100%;
            display: flex;
            justify-content: center;
            text-decoration: none;
        }
    }
`

export const DemoDescription = styled.div`
    grid-column: 7/12;
    grid-row: 2/10;
    font-size: 1.15em;
    text-align: justify;
    overflow: auto;

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 7/12;
        font-size: 0.9em;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`