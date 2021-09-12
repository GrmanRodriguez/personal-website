import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import Observer from '@researchgate/react-intersection-observer';
import { faRobot, faTerminal, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver'
import { deviceSizes } from '../../media';
import { ensure, incompleteNavbarObserverOptions, ToggleNavbarProps } from '../../util';
import { FlexLayout, FlexSubSectionTitle, GridLayout, 
          LayoutColors, StyledButton, SubSectionTitle } from '../../style/shared-style-components';
import { Welcome, WelcomeImage, LanguagesContainer, LanguagesButton, 
          SkillsSelectorContainer, SkillsSelector, LogosContainer, 
          LogosGrid, TimelineContainer, ExpandAll } from './styles';
import { english, spanish, italian, WelcomeText } from './languages';
import { generalLogos, roboticsLogos, webLogos, SkillLogo } from './skills';
import { workExperience } from './work';
import { cityMarkers } from './cities';
import TimelineItem from './timeline';
import { education } from './education';


function About({setWhiteNavbar} : ToggleNavbarProps) : JSX.Element {

  const [welcomeText, setWelcomeText] = useState<WelcomeText>(english);

  const [skills, setSkills] = useState<SkillLogo[]>(generalLogos);
  const [skillType, setSkillType] = useState<string>("General");

  const [expandWork, setExpandWork] = useState<boolean>(false);
  const [expandEducation, setExpandEducation] = useState<boolean>(false);

  const isMobile = useMediaQuery({maxWidth: deviceSizes.mobileL});

  // Calculate age
  const today = new Date();
  const birthday = new Date(1997, 1, 15);
  let age = today.getUTCFullYear() - birthday.getUTCFullYear();
  const month = today.getMonth() - birthday.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
      age--;
  }

  const cv : string = './assets/cv.pdf';
  const serveCv = function() : void {
    saveAs(cv, 'GermanRodriguezCV.pdf');
  }

  const observerOptions = {
    ...incompleteNavbarObserverOptions,
    onChange: (entry : IntersectionObserverEntry)=>{setWhiteNavbar(entry.isIntersecting)},
  }

  // Selectors in the Skills section change in order if it's in mobile
  // for better styling
  const generalSelectorProperties = {
    logos: generalLogos,
    icon: faTerminal,
    name: "General"
  }

  const roboticsSelectorProperties = {
    logos: roboticsLogos,
    icon: faRobot,
    name: "Robotics"
  }

  const webSelectorProperties = {
    logos: webLogos,
    icon: faWifi,
    name: "Web"
  }
                                        
  const selectorProperties = isMobile ? 
                              [generalSelectorProperties, webSelectorProperties, roboticsSelectorProperties] 
                              : [generalSelectorProperties, roboticsSelectorProperties, webSelectorProperties];


  let logoSelectorSize = skillType === "robotics" ? 35 : 70;
  let mobileDivisor = isMobile ? 1.7 : 1;
  let logoSize = logoSelectorSize / mobileDivisor;

  return (
    <>
    <Helmet>
      <title>About | Germán Rodriguez</title>
    </Helmet>
    <GridLayout color={LayoutColors.Yellow}>
      <WelcomeImage>
        <img src="assets/nobg2.png" alt="Germán"/>
      </WelcomeImage>
      <Welcome>
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={welcomeText.iAm}
            timeout={300}
            classNames="fade-side">
            <div>
              <h1>{welcomeText.greeting}!</h1>
              <h1>{welcomeText.iAm} Germán.</h1>
              <p>{welcomeText.firstParagraph1}{age}{welcomeText.firstParagraph2}</p>
              <p>{welcomeText.secondParagraph}</p>
            </div>
          </CSSTransition>            
        </SwitchTransition>
        <StyledButton bold onClick={serveCv}>
          {welcomeText.downloadCv}
        </StyledButton>
        <LanguagesContainer>
          <LanguagesButton
            src="/assets/flags/ukflag.png"
            onClick={()=>setWelcomeText(english)} 
          />
          <LanguagesButton
            src="/assets/flags/spainflag.png"
            onClick={()=>setWelcomeText(spanish)} 
          />
          <LanguagesButton
            src="/assets/flags/italyflag.png"
            onClick={()=>setWelcomeText(italian)} 
          />
        </LanguagesContainer>
      </Welcome>
    </GridLayout>
    <GridLayout>
      <SubSectionTitle>Skills</SubSectionTitle>
      <SkillsSelectorContainer>
        {selectorProperties.map(selector => {
          const {logos, icon, name} = selector;
          return (
            <SkillsSelector
            key={name}
            onClick={()=>{setSkills(logos);setSkillType(name)}}
            active={skillType === name}>
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </SkillsSelector> 
          )
        })}                          
      </SkillsSelectorContainer>
      <LogosContainer>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition 
            key={skillType}
            timeout={300}
            classNames="come-side">
              <LogosGrid>
                {
                  skills.map(skill => {
                    return (
                      <div key={skill.filename} data-tooltip={skill.name}>
                        <img src={`/assets/logos/${skill.filename}`} alt={skill.name} height={logoSize}/>
                      </div>
                    )
                  })
                }
              </LogosGrid>
          </CSSTransition>
        </SwitchTransition>
      </LogosContainer>
    </GridLayout>
    <Observer {...observerOptions}>
      <FlexLayout color={LayoutColors.Gray}>
          <FlexSubSectionTitle>Work History</FlexSubSectionTitle>
          <ExpandAll onClick={()=>{setExpandWork(expand=>!expand)}}/>
          <TimelineContainer>
            {
              workExperience.map((workItem, index, array) => (
                <TimelineItem 
                  timelineEvent={workItem}
                  expand={expandWork || isMobile}
                  first={index === 0}
                  last={index + 1 === array.length}
                  markerXCoordinate={
                    ensure(cityMarkers.find(marker=>marker.name === workItem.city)).markerXCoordinate
                  }
                  markerYCoordinate={
                    ensure(cityMarkers.find(marker=>marker.name === workItem.city)).markerYCoordinate
                  }
                />
              ))
            }
          </TimelineContainer>
      </FlexLayout>
    </Observer>
    <FlexLayout color={LayoutColors.Yellow}>
      <FlexSubSectionTitle>Education</FlexSubSectionTitle>
        <ExpandAll onClick={()=>{setExpandEducation(expand=>!expand)}}/>
        <TimelineContainer>
          {
            education.map((educationItem, index, array) => (
              <TimelineItem 
                timelineEvent={educationItem}
                expand={expandEducation || isMobile}
                invertColor
                first={index === 0}
                last={index + 1 === array.length}
                markerXCoordinate={
                  ensure(cityMarkers.find(marker=>marker.name === educationItem.city)).markerXCoordinate
                }
                markerYCoordinate={
                  ensure(cityMarkers.find(marker=>marker.name === educationItem.city)).markerYCoordinate
                }
              />
            ))
          }
        </TimelineContainer>
    </FlexLayout>
    </>
  );
}
  
export default About;