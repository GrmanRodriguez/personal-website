export interface WelcomeText {
    greeting: string,
    iAm: string,
    firstParagraph1: string,
    firstParagraph2: string,
    secondParagraph: string,
    downloadCv: string
}

export const english : WelcomeText = {
    greeting: "Hi",
    iAm: "I am ",
    firstParagraph1: "I am a ",
    firstParagraph2: "-years-old robotics engineer. I make algorithms for robots.",
    secondParagraph: "I am also interested in general programming, and the web.",
    downloadCv: "Download my CV"
}

export const spanish : WelcomeText = {
    greeting: "Hola",
    iAm: "Soy ",
    firstParagraph1: "Soy un ingeniero de robótica de ",
    firstParagraph2: " años. Creo algoritmos para robots.",
    secondParagraph: "También estoy interesado por la programación en general, y la web.",
    downloadCv: "Descarga mi CV"
}

export const italian : WelcomeText = {
    greeting: "Ciao",
    iAm: "Sono ",
    firstParagraph1: "Sono un ingegnere di robotica di ",
    firstParagraph2: "anni. Sviluppo algoritmi per robots.",
    secondParagraph: "Sono anche interessato alla programmazione generale e al web.",
    downloadCv: "Scarica il mio CV"
}