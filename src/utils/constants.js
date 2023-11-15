// Regex

const nameRegex = "[A-Za-zА-Яа-яЁё\\s\\-]{2,30}";
// const passwordRegex = /^.$/gm;
const emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

// img api

const beatApi = "https://api.nomoreparties.co"

// Limiter constants

const desktop = 1280;
const tabletWide = 990;
const tablet = 768;
const mobile = 540;

const desktopBody = 16;
const tabletWideBody = 12;
const tabletBody = 8;
const mobileBody = 5;

const desktopStep = 4;
const tabletWideStep = 3;
const tabletStep = 2;
const mobileStep = 2;




export {
    nameRegex,
    // passwordRegex,
    emailRegex,
    beatApi,
    desktop,
    tablet,
    tabletWide,
    mobile,
    desktopBody,
    desktopStep,
    tabletBody,
    tabletStep,
    tabletWideBody,
    tabletWideStep,
    mobileBody,
    mobileStep
};