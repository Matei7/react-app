import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";

import translationEN from 'locales/en/trasnslation.json';
import translationRO from 'locales/ro/trasnslation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ro: {
        translation: translationRO
    }
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ro",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;