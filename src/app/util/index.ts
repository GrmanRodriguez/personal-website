import React, { SetStateAction } from "react";

export interface ToggleNavbarProps {
    setWhiteNavbar: React.Dispatch<SetStateAction<boolean>>;
}

//Observer options for navbar, missing the callback
export let incompleteNavbarObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: `0px 0px -${Math.round(window.innerHeight*11/12)}px 0px`
}

// Helper function to prevent type errors with methods that return T | undefined types
export function ensure<T>(argument: T | undefined | null, message: string = 'Value not found in array.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
  
    return argument;
}