import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    html,
    body {
        margin: 0;
        padding: 0;

        font-family: 'Poppins', sans-serif;

        --black:#191923;
        --yellow:#dbbe00;
        --white:#fbfef9;
        --gray:#7c7c7c;
        --light-gray:#aaa;

        --animation:0.3s ease-in-out;
        --animation-slower:0.6s ease-in-out;
    }

    //React Transition Classes
    .come-down-enter {
        transform: translateY(-100%);
    }

    .come-down-enter-done {
        transform: translateY(0);
        transition: transform var(--animation);
    }

    .come-down-exit {
        transform: translateY(0);
    }

    .come-down-exit-active {
        transform: translateY(-100%);
        transition: transform var(--animation);
    }

    .fade-side-enter {
        transform: translateX(-10%);
        opacity: 0;
    }

    .fade-side-enter-done {
        transform: translateX(0);
        opacity: 1;
        transition: transform var(--animation-slower), opacity var(--animation-slower);
    }

    .fade-side-exit {
        transform: translateX(0);
        opacity: 1;
    }

    .fade-side-exit-active {
        transform: translateX(10%);
        opacity: 0;
        transition: transform var(--animation-slower), opacity var(--animation-slower);
    }

    .come-side-enter {
        transform: translateX(-100%);
    }

    .come-side-enter-done {
        transform: translateX(0);
        transition: transform var(--animation-slower);
    }

    .come-side-exit {
        transform: translateX(0);
    }

    .come-side-exit-active {
        transform: translateX(100%);
        transition: transform var(--animation-slower);
    }

    // reset button styling
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

`