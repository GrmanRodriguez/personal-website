import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { deviceSizes } from '../../media';
import { TimelineCircle, TimelineFlexContainer, TimelineDate, 
        Card, TimelineCircleProps, CardProps } from './styles';

export interface TimelineEvent {
    mainTitle : string,
    secondTitle : string,
    beginning : Date,
    end : Date,
    city : string,
    country : string,
    description : string[]    
}

interface TimelineItemProps extends CardProps, TimelineCircleProps {
    timelineEvent : TimelineEvent,
    expand : boolean
}

function TimelineItem({timelineEvent, expand, first, last, invertColor, markerXCoordinate, markerYCoordinate} : TimelineItemProps) : JSX.Element {

    const isMobile = useMediaQuery({maxWidth: deviceSizes.mobileL});

    // Turns the two date objects into the string that goes into the timeline
    const generateDateString =function(beginningDate : Date, endDate : Date) : string {

        let dateString = '';

        const beginningString = beginningDate.toLocaleDateString('default', {month: 'short', year:'numeric'});

        const today = new Date();
        const endDateIsToday = (
            today.getUTCFullYear() === endDate.getUTCFullYear() &&
            today.getUTCMonth() === endDate.getUTCMonth() &&
            today.getUTCDate() === endDate.getUTCDate()
        );
        const endString = endDateIsToday ? 'Present' : endDate.toLocaleDateString('default', {month: 'short', year:'numeric'});

        dateString += beginningString;
        dateString += '-';
        dateString += endString;

        return dateString;
    }

    const {mainTitle, 
        secondTitle, 
        beginning, 
        end, 
        city,
        country, 
        description} = timelineEvent;

    const timelineCircle = 
    (<TimelineCircle first={first} last={last} invertColor={invertColor} />)    

    const timelineDate = 
    (<TimelineDate>
        <span>
            <FontAwesomeIcon icon={faCalendarAlt} />{' '}{generateDateString(beginning, end)}
        </span>
    </TimelineDate>)

    const card = 
    (<Card
    className={expand ? 'expanded' : ''}
    markerXCoordinate={markerXCoordinate}
    markerYCoordinate={markerYCoordinate}>
        <h2>{mainTitle}</h2>
        <div className="second-title-place">
            <h3>{secondTitle}</h3>
            <span><FontAwesomeIcon icon={ faMapMarkerAlt }/>{' '}{city}, {country}</span>
        </div>                        
        <ul>
            {
                description.map(descriptionItem => (
                    <li>{descriptionItem}</li>
                ))
            }
        </ul>
        <div className="country-container">
            <div className="country">
                <img src={`/assets/countries/${country}.svg`} alt={country}/>
                <span>
                    <FontAwesomeIcon icon={ faMapMarkerAlt }/>
                </span>
            </div>
        </div>
    </Card>)

    // If mobile, the date and card are in a flex container
    // Outside of mobile they are all independent, with their 
    // grid positioning set in their CSS
    if (isMobile) {
        return (
            <>
                {timelineCircle}
                <TimelineFlexContainer>
                    {timelineDate}
                    {card}
                </TimelineFlexContainer>
            </>
        )
    } else {
        return (
            <>
                {timelineDate}
                {timelineCircle}
                {card}
            </>
        )
    }
}

export default TimelineItem;