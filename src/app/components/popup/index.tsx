import React from 'react'
import { Transition } from 'react-transition-group';
import { PopupBox } from './styles'

interface PopupProps {
    children: React.ReactNode;
    inProp: boolean;
    danger?: boolean;
    
}

function Popup({children, inProp, danger} : PopupProps) : JSX.Element {

    const duration : number = 300;

    return (
        <Transition in={inProp} timeout={duration}>
            {
                state => (
                    <PopupBox state={state} danger={danger}>
                        <div className="box">
                            {children}
                        </div>                
                    </PopupBox>
                )
            }
        </Transition>
        
    )
}

export default Popup