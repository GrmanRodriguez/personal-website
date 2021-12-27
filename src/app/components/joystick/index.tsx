import React from 'react';
import { JoyStickButtonCover, JoyStickContainer, JoyStickDownButton, JoyStickLeftButton, JoyStickRightButton, JoyStickUpButton } from './styles';

interface JoyStickProps {
    onUp : ()=>void;
    onDown : ()=>void;
    onLeft? : ()=>void;
    onRight? : ()=>void;
    onRelease? : ()=>void;
}

function JoyStick({onUp, onDown, onLeft, onRight, onRelease} : JoyStickProps) : JSX.Element {
    return (
        <JoyStickContainer>
            <JoyStickUpButton onTouchStart={onUp} onTouchEnd={onRelease ? onRelease : undefined}/>
            {
                onLeft && <JoyStickLeftButton onTouchStart={onLeft} onTouchEnd={onRelease ? onRelease : undefined}/>
            }
            {
                onRight && <JoyStickRightButton onTouchStart={onRight} onTouchEnd={onRelease ? onRelease : undefined}/>
            }            
            <JoyStickDownButton onTouchStart={onDown} onTouchEnd={onRelease ? onRelease : undefined}/>
            <JoyStickButtonCover />
        </JoyStickContainer>
    )
}

export default JoyStick