interface Demo {
    title : string;
    image?: string;
    description: string;
    url: string;
}

export const demos : Demo[] = [
    {
        title: 'Kalman Filter',
        image: 'kalman-filter.png',
        description: 'The Kalman Filter is an algorithm that allows us to estimate the state of a system even under uncertain conditions, by weighing the covariance of process disturbances and measurement noise.\n In this demo a disturbed 2D system with noisy measurements uses the Kalman Filter to get an accurate measurement of its state.',
        url: '/play/kalman-filter'
    },
    {
        title: 'Hello',
        description: 'this is a test',
        url: '/play/hello'
    },
    {
        title: 'Hello',
        description: 'this is a test',
        url: 'https://github.com/GrmanRodriguez/personal-website'
    }
]