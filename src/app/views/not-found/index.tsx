import React from 'react';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { GridLayout, LayoutColors } from '../../style/shared-style-components';
import { ToggleNavbarProps } from '../../util';
import { MainText, Meme } from './styles';

function NotFound( {setWhiteNavbar} : ToggleNavbarProps ) {

  useEffect(()=>{
    setWhiteNavbar(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <Helmet>
      <title>Not found | Germán Rodriguez</title>
    </Helmet>
    <GridLayout color={LayoutColors.Gray}>
      <MainText>
        When you visit a URL that returns 404:
      </MainText>
      <Meme src="https://miro.medium.com/max/910/1*snTXFElFuQLSFDnvZKJ6IA.png" alt="you are lost"/>
    </GridLayout>
    </>
  );
}
  
export default NotFound;