import styled from 'styled-components';
import { device } from '../../media';

export const FormPanel = styled.div`
    background-color: var(--white);
    grid-column: 4/10;
    grid-row: 3/11;
    box-shadow: 0px 4px 15px -5px var(--black);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);

    @media ${device.mobileL} {
        grid-column: 2/12;
        grid-row: 3/12;
    }
`

export const FormIntroduction = styled.h1`
    grid-row: 1;
    grid-column: 1/-1;
    text-align: center;
    font-size: 1.4em;
    color: var(--black);
    margin-top: auto;
    margin-bottom: 15px;
`

export const FormMessage = styled.p`
    grid-row: 2;
    grid-column: 1/-1;
    text-align: center;
    color: var(--black);
    font-size: 0.9em;
    margin-top: 0;
    justify-self: center;
    width: 90%;
`

export const Form = styled.form`
    grid-column: 2/7;
    grid-row: 3/6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const Label = styled.label`
    color: var(--gray);
    font-size: 0.9em;
`

export const SingleLineInput = styled.input`
    width: 100%;
    height: 1.6em;
`

export const MultiLineInput = styled.textarea`
    width: 100%;
    height: 15em;
    margin-bottom: 1em;
    font-family: Poppins;
`

export const FormButton = styled.div`
    grid-row: 6;
    grid-column: 3/6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`