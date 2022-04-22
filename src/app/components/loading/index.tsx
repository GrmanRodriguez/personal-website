import React from 'react'
import { GridLayout, LayoutColors } from '../../style/shared-style-components'
import { ToggleNavbarProps } from '../../util'
import { LoadingDots, LoadingDotsContainer } from './styles'

function Loading({setWhiteNavbar} : ToggleNavbarProps) : JSX.Element {
    
    setWhiteNavbar(false);
    
    return (
        <GridLayout color={LayoutColors.White}>
            <LoadingDotsContainer>
                <LoadingDots/>
            </LoadingDotsContainer>
        </GridLayout>
    )
}

export default Loading