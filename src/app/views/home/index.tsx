import React from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { GridLayout, StyledButton } from '../../style/shared-style-components';
import { ButtonContainer, IconsContainer, MainTitle, SubTitle } from './styles';
import { ToggleNavbarProps } from '../../util';

function Home({setWhiteNavbar} : ToggleNavbarProps) {

  setWhiteNavbar(false);

  return (
    <GridLayout>
      <Helmet>
        <title>Germán Rodriguez</title>
      </Helmet>
      <MainTitle>
        Germán Rodriguez
      </MainTitle>
      <SubTitle>
        Robotics Engineer and Developer
      </SubTitle>
      <ButtonContainer>
        <a href="/contact">
          <StyledButton>
            Send Me an Email
          </StyledButton>
        </a>        
      </ButtonContainer>
      <IconsContainer>
        <a href="https://github.com/GrmanRodriguez">
          <FontAwesomeIcon size="lg" icon={faGithub}></FontAwesomeIcon>
        </a>
        <a href="https://www.linkedin.com/in/german-rodriguez-521716185/">
          <FontAwesomeIcon size="lg" icon={faLinkedinIn}></FontAwesomeIcon>
        </a>
      </IconsContainer>
    </GridLayout>
  );
}

export default Home;