import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import PTBR from "./locales/pt/translation.json";
import ENUS from "./locales/en/translation.json";

const resources = {
  en: {
    translation: ENUS,
  },
  pt: {
    translation: PTBR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
