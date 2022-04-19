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
        title: 'PID Controller',
        image: 'pid.png',
        description: 'The PID Controller is one of the most common strategies for control loops using feedback due to its efficacy and conceptual simplicity.\nIt measures the error of the system relative to its setpoint and determines the system input as a function of this error.\nA PID Controller with tunable gains is implemented on a simple system to see it in action.',
        url: '/play/pid'
    },
]