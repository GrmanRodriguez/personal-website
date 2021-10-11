interface Demo {
    title : string;
    image?: string;
    description: string;
    url: string;
}

export const demos : Demo[] = [
    {
        title: 'Kalman Filter',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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