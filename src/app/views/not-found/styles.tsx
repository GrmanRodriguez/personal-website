import styled from 'styled-components';
import { device } from '../../media';

export const MainText = styled.h2`
    grid-row: 4;
    grid-column: 2/12;
    place-self: center;
    text-align: center;
    text-shadow: 2px 2px var(--black);

    @media ${device.mobileL} {
        grid-row: 3;
    }
`

export const Meme = styled.img`
    grid-row: 4/10;
    grid-column: 1/-1;
    place-self: center;
    

    @media ${device.mobileL} {
        object-fit: contain;
        width: 100%;
        height: 100%;
        grid-row: 5/9;
        grid-column: 2/12;
    }
`