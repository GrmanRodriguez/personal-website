import styled from 'styled-components';
import { device } from '../../media';

export const Welcome = styled.div`
    grid-column: 7/11;
    grid-row: 4/10;
    display: flex;
    flex-direction: column;

    h1 {
        font-weight: normal;
        font-size: clamp(1.5em, 5vh, 3em);
        margin-top: 5px;
        margin-bottom: 5px;
    }

    p {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 30ch;
    }

    p:last-child {
        padding-bottom: 10px;
    }

    @media ${device.mobileL} {
        grid-column: 3/11;
        grid-row: 3/7;
        text-align: center;
        align-items: center;

        p {
            font-size: 0.8em;
        }
    }
`

export const LanguagesContainer = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
    padding-top: 3vh;
`

export const LanguagesButton = styled.img`
    height: 25px;
    width: 25px;
    border: 2px solid var(--black);
    border-radius: 50%;
    transition: transform var(--animation);

    :hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`

export const WelcomeImage = styled.div`
    grid-column: 2/6;
    grid-row: 3/-1;
    position: relative;

    img {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        max-height: 100%;
        width: auto;
        height: auto;
    }

    @media ${device.mobileL} {
        grid-column: 3/11;
        grid-row: 8/-1;

        img {
            max-height: 90%;
        }        
    }
`

export const SkillsSelectorContainer = styled.div`
    grid-column: 3;
    grid-row: 4/12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media ${device.mobileL} {
        grid-row: 4;
        grid-column: 3/11;
        flex-direction: row; 
    }
`
interface SkillsSelectorProps {
    active?: boolean;
}

export const SkillsSelector = styled.div<SkillsSelectorProps>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 2em;
    color: ${props => props.active ? 'var(--yellow)' : 'inherit'};
    transition: color var(--animation), transform var(--animation);

    span {
        font-size: 0.7em;
    }

    :hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    @media ${device.mobileL} {
        font-size: 1.5em;
        position: relative;

        span {
            font-size: 0.7em;
        }

        :nth-child(2) {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
`

export const LogosContainer = styled.div`
    grid-column: 5/12;
    grid-row: 4/12;
    overflow-x: hidden;
    overflow-y: visible;
    box-shadow: 0px 0px 15px -2px var(--gray);

    @media ${device.mobileL} {
        grid-row: 6/12;
        grid-column: 3/11;
    }
`

export const LogosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
    overflow: visible;

    * {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        transition: transform var(--animation);

        ::before {
            content: attr(data-tooltip);
            color: var(--black);
            font-weight: bold;
            position: absolute;
            top: -2px;
            z-index: 2;
        }

        @media (hover) {
            ::before {
                transition: all var(--animation);
                transform: translateY(-50%);
                opacity: 0;
            }

            :hover {
                transform: scale(1.1);
            }

            :hover::before {
                transform: translateY(0);
                opacity: 1;
            }

        }
    }

    @media ${device.mobileL} {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
`
const ExpandAllStyle = styled.div`
    color: inherit;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

interface ExpandAllProps {
    onClick: ()=>void;
}

export const ExpandAll = ({onClick} : ExpandAllProps)=>(<ExpandAllStyle onClick={onClick}>Expand All</ExpandAllStyle>) 

export const TimelineContainer = styled.div`
    width: min(80%, 900px);
    margin-top: 30px;
    display: grid;
    grid-template-columns: 120px 50px 1fr;
    grid-auto-rows: max-content;
    padding-bottom: 50px;

    @media ${device.mobileL} {
        grid-template-columns: 40px 1fr;
        margin-right: 40px;
    }
`

export interface TimelineCircleProps {
    first?: boolean,
    last?: boolean,
    invertColor?: boolean
}

export const TimelineCircle = styled.div<TimelineCircleProps>`
    grid-column: 2;
    width: 30px;
    height: 100%;
    position: relative;
    align-self: center;
    justify-self: center;
    
    ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background-color: var(--white);
        border-radius: 50%;
        border: 5px solid ${props => props.invertColor ? 'var(--gray)' : 'var(--yellow)'};
        z-index: 2;
    }

    ::after {
        content: '';
        width: 5px;
        height: ${props => props.first || props.last ? '50%' : '100%'};
        background-color: ${props => props.invertColor ? 'var(--gray)' : 'var(--yellow)'};
        position: absolute;
        left: 50%;
        top: ${props => props.first ? '50%' : '0'};
        transform: translateX(-50%);
    }

    @media ${device.mobileL} {
        grid-column: 1;
    }
`

export const TimelineFlexContainer = styled.div`
    grid-column: 2;
    display: flex;
    flex-direction: column;
`

// Styling for the Date of a timeline
// Date should go inside a <span>
export const TimelineDate = styled.div`
    color: inherit;
    font-size: 0.8em;
    font-weight: 600;
    align-self: center;
    justify-self: center;
` 
export interface CardProps {
    markerXCoordinate: number,
    markerYCoordinate: number
}

// Styling for a timeline card
// className 'expanded' does the same as hover
// second title and location go inside .second-title-place container
// location should be inside <span>
// country should go inside .country-container container
// city pin should be inside <span>
export const Card = styled.div<CardProps>`
    background-color: var(--white);
    border-radius: 15px;
    box-shadow: 0px 4px 15px -5px var(--black);
    width: 95%;
    height: 100px;
    margin: 10px 0;
    align-self: center;
    justify-self: center;
    transition: height var(--animation-slower);
    color: var(--black);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    --delay: 0.2s;

    h2, h3, .second-title-place, span, ul, li {
        padding: 0;
        margin: 0;
    }

    h2, .second-title-place, ul, li {
        margin-left: 5%;
    }

    h2 {
        font-weight: 600;
        color: var(--yellow);
        font-size: 1.4em;
        padding: 0.6em 0 0.3em 0;
        
    }

    .second-title-place {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 60%;
        align-items: center;
    }

    .second-title-place > span {
        font-size: 0.8em;
        opacity: 0;
        transition: opacity var(--animation);
    }

    h3 {
        font-weight: normal;
        font-size: 1.2em;
        padding: 0.2em 0 0.4em 0;
        transition: padding var(--animation);
    }

    ul, li {
        opacity: 0;
        transition: opacity var(--animation);
        transition-delay: var(--delay);
    }

    ul {
        padding-top: 0.2em;
        width: 60%;
    }

    li {
        font-size: 0.9em;
        padding: 0.3em 0;
    }

    .country-container {
        position: absolute;
        right: 1%;
        width: 35%;
        height: 100%;
        opacity: 0;
        transition: opacity var(--animation);
        transition-delay: var(--delay);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .country {
        height: auto;
        width: auto;
        margin: 0;
        padding: 0;
        position: relative;
        display: grid;
        place-items: center;
    }

    .country > img {
        max-width: 70%;
        -webkit-filter: drop-shadow(0px 4px 1px var(--gray));
        filter: drop-shadow(0px 4px 1px var(--gray));
    }

    .country > span {
        position: absolute;
        top: ${props => props.markerYCoordinate}%;
        left: ${props => props.markerXCoordinate}%;
        opacity: 0;
        transform: translateY(-100%);
        transition: opacity var(--animation), transform var(--animation);
        transition-delay: calc(3 * var(--delay));
    }

    :hover, &.expanded {
        height: 250px;

        span, ul, li, .country-container {
            opacity: 1;
        }

        .country-container > span {
            opacity: 1;
            transform: translateY(0);
        }
        
    }

    @media ${device.mobileL} {
        align-items: center;
        text-align: center;

        h2, .second-title-place, ul, li {
            margin-left: 0;
        }

        .second-title-place {
            width: 100%;
        }

        &.expanded {
            height: 550px;
        }

        .country-container {
            position: static;
            order: -1;
        }


    }

`