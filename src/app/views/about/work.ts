import { TimelineEvent } from "./timeline";

export const workExperience : TimelineEvent[] = [
    {
        mainTitle: 'Istituto Itaiano di Tecnologia',
        secondTitle: 'Robotics SW Engineer',
        beginning: new Date(2021, 6, 16),
        end: new Date(),
        city: 'Genoa',
        country: 'Italy',
        description: [
            'Developed software for the ergoCub project',
            'The software did beep boop and robot do things',
            'It was very nice'
        ]
    },
    {
        mainTitle: 'ABB',
        secondTitle: 'Robotics Engineering Intern',
        beginning: new Date(2020, 8, 1),
        end: new Date(2021, 1, 28),
        city: 'Mannheim',
        country: 'Germany',
        description: [
            'Developed a platform using Computer Vision for automated robot kitting',
            'In charge of all initial phases of project from concept to prototype',
            'C#, JavaScript, OpenCV, ABB RAPID, ABB RWS'
        ]
    },
    {
        mainTitle: 'Covmatic',
        secondTitle: 'Robotics Volunteer',
        beginning: new Date(2020, 5, 1),
        end: new Date(2020, 7, 30),
        city: 'Bergamo',
        country: 'Italy',
        description: [
            'Developed a high-throuput robotic testing station for Covid-19 in a Bergamo hospital',
            'In charge of robot interoperability and connection to front-end interface and back-end tracking',
            'Python, Flask, Opentrons API'
        ]
    }
]