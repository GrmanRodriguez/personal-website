import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FlexLayout, FlexSubSectionTitle, LayoutColors, StyledButton } from '../../../style/shared-style-components';
import { ToggleNavbarProps } from '../../../util';
import { demos } from '../demos';
import { DemoContainer, DemoDescription, DemoImage, DemoName, DemosPanel, GoToDemoButtonContainer } from './styles';

function PlayHome({ setWhiteNavbar } : ToggleNavbarProps) : JSX.Element {

    useEffect(()=>{
        setWhiteNavbar(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Helmet>
            <title>Play | Germán Rodriguez</title>
        </Helmet>
        <FlexLayout color={LayoutColors.Yellow}>
            <FlexSubSectionTitle>Play</FlexSubSectionTitle>
            <DemosPanel>
                {
                    demos.map((demo, index) => (
                        <DemoContainer key={`demo-${index}`} last={index === demos.length - 1}>
                            <DemoName>{demo.title}</DemoName>
                            <DemoImage src={`/assets/demos/${demo.image || 'placeholder.png'}`} />
                            {demo.description && <DemoDescription>{demo.description}</DemoDescription>}
                            <GoToDemoButtonContainer>
                                <a href={demo.url}>
                                    <StyledButton>Go To Demo!</StyledButton>
                                </a>                                
                            </GoToDemoButtonContainer>
                        </DemoContainer>
                    ))
                }
            </DemosPanel>
        </FlexLayout> 
        </>
    )
}

export default PlayHome