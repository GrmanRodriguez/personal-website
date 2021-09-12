import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { deviceSizes } from '../../media';
import { NavBar, NavBarLinks, NavBarName, HamburgerMenu, NavExpandedMenu, CloseExpandedMenu } from './styles';

interface NavbarProps {
    white?: boolean;
}

function NavigationBar(navbarProps : NavbarProps) {
    const navbarRoutes = [
        {
            "name": "Home",
            "route": "/"
        },
        {
            "name": "About",
            "route": "/about"
        },
        {
            "name": "Contact",
            "route": "/contact"
        },
        {
            "name": "Play",
            "route": "/play"
        }
    ]

    const isMobile = useMediaQuery({maxWidth: deviceSizes.mobileL});
    const [expandMenu, setExpandMenu] = useState<boolean>(false);

    const links = navbarRoutes.map((navbarRoute) => {
        return(
            <NavLink exact
                key={navbarRoute.name} 
                to={navbarRoute.route}
                activeClassName="active"
                onClick={()=>{setExpandMenu(false)}}>{navbarRoute.name}
            </NavLink>
        )
    })

    const onHamburgerMenuPress = function() : void {
        setExpandMenu(true);
    }

    if (isMobile) {
        return (
            <>
            <NavBar whiteText={navbarProps.white}>
                <HamburgerMenu>
                    <FontAwesomeIcon 
                        icon={faBars}
                        size="lg" onClick={onHamburgerMenuPress}/>
                </HamburgerMenu>
            </NavBar>
            <CSSTransition in={expandMenu}
                classNames="come-down"
                timeout={100}
                unmountOnExit
                mountOnEnter>
                <NavExpandedMenu>
                    <CloseExpandedMenu>
                        <FontAwesomeIcon 
                            icon={faTimes}
                            size="lg" onClick={()=>{setExpandMenu(false)}}/>
                    </CloseExpandedMenu>                    
                    <NavBarLinks>
                        {links}
                    </NavBarLinks>
                </NavExpandedMenu>
            </CSSTransition>  
            </>
        )
    } else {
        return (
            <NavBar whiteText={navbarProps.white}>
                <NavBarName>Germán Rodriguez</NavBarName>
                <NavBarLinks>
                    {links}
                </NavBarLinks>
            </NavBar>
        )
    }
  }
  
export default NavigationBar;