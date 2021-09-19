import styled from 'styled-components'

interface PopupBoxProps {
    danger? : boolean;
    state: string;
}

const setPropertyFromState = function(state : string, onEntering : string, onEntered : string, onExiting : string, onExited : string, onDefault : string) : string {
    switch (state) {
        case 'entering':
            return onEntering
        case 'entered':
            return onEntered
        case 'exiting':
            return onExiting
        case 'exited':
            return onExited
        default:
            return onDefault
    }
}

export const PopupBox = styled.div<PopupBoxProps>`
    position: fixed;
    width: max(350px, 40%);
    padding-top: 5vh;
    padding-bottom: 5vh;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    .box {
        width: max(300px, 30%);
        padding: 10px 5px;
        color: var(--white);
        background-color: ${props => props.danger ? '#cc3300' : '#339900'};
        border: 2px solid var(--white);
        border-radius: 10px;
        transition: opacity var(--animation), transform var(--animation-slower);
        text-align: center;
        transform: ${props => (setPropertyFromState(props.state,
                                                    'translateY(30%)',
                                                    'translateY(0)',
                                                    'translateY(0)',
                                                    'translateY(30%)',
                                                    'translateY(0)'))};
        opacity: ${props=> (setPropertyFromState(props.state,'0','1','1','0','1'))};
        pointer-events: none;
    }    
`