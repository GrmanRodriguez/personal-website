import styled from 'styled-components'
import { device } from '../../media'

interface NavBarProps {
    whiteText?: boolean
}

export const NavBar = styled.nav<NavBarProps>`
    position: fixed;
    top: 0;
    width: 100vw;
    height: calc(100vh / 12);
    display: grid;
    align-content: center;
    grid-template-columns: repeat(12, 1fr);
    color: ${props => props.whiteText ? "var(--white)" : "var(--black)"};
    box-shadow: ${props => props.whiteText ? "inset 0 60px 60px -60px var(--black)" : ""};
    z-index: 10;
    transition: color var(--animation), box-shadow var(--animation);
`

export const NavBarName = styled.span`
    grid-column: 2/6;
    font-size: 26px;
    text-align: center;
    align-self: center;
`

export const NavBarLinks = styled.div<NavBarProps>`
    grid-column: 7 / 11;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: inherit;

    a {
        text-decoration: none;
        color: inherit;
    }

    @media ${device.mobileL} {
        flex-direction: column;
        height: 40vh;
    }
`

export const HamburgerMenu = styled.div`
    grid-column: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
`

export const NavExpandedMenu = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--yellow);
    color: var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    position: fixed;
    top: 0;
`

export const CloseExpandedMenu = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: calc(100vh / 12);
    display: grid;
    align-items: center;

    svg {
        grid-column: 11;
    }
`