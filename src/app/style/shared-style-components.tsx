import styled from 'styled-components';

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