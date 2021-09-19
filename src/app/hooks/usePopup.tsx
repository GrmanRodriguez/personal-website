import React, { useState } from 'react'
import Popup from '../components/popup'

const usePopup = function() : [JSX.Element, (message : string, timeout: number, danger? : boolean)=>void]{
    const [inStatus, setInStatus] = useState<boolean>(false)
    const [danger, setDanger] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const showPopup = function(message : string, timeout: number, danger? : boolean) {
        setMessage(message)
        setDanger(danger || false)
        setInStatus(true)
        setTimeout(()=>{
            setInStatus(false)
        }, timeout)
    }

    const PopupComponent = <Popup inProp={inStatus} danger={danger}>{message}</Popup>

    return ([PopupComponent, showPopup])
}

export default usePopup 