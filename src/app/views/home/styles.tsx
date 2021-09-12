import styled from 'styled-components';
import { device } from '../../media';

export const MainTitle = styled.span`
    font-size: 10vh;
    grid-row: 7;
    grid-column: 1/-1;
    place-self: center;
    text-align: center;
    text-shadow: 4px 4px var(--yellow);

    @media ${device.mobileL} {
        font-size: 4.7vh;
        text-shadow: 2px 2px var(--yellow);
    }
`;

export const SubTitle = styled.span`
    font-size: 4vh;
    grid-row: 8;
    grid-column: 1/-1;
    place-self: center;
    text-align: center;

    @media ${device.mobileL} {
        font-size: 2.5vh;
    }
`

export const ButtonContainer = styled.div`
    grid-row: 9;
    grid-column: 1/-1;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    a {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
    }

    @media ${device.mobileL} {
        align-items: center;
    }
`

export const IconsContainer = styled.div`
    grid-row: 10;
    grid-column: 6/8;
    display: grid;
    grid-template-columns: 1fr 1fr;

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3.5vh;
        transition: color var(--animation);
    }

    a:hover {
        color: var(--yellow);
    }

    * {
        align-self: end;
    }

    @media ${device.mobileL} {
        * {
            align-self: center;
        }

        a {
            font-size: 2vh
        }
    }
`