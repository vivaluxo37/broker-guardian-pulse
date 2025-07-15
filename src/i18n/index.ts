import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files for 26 languages (foundation for 56 total)
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import ptTranslations from './locales/pt.json';
import ptBrTranslations from './locales/pt-br.json';
import itTranslations from './locales/it.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';
import zhTranslations from './locales/zh.json';
import zhTwTranslations from './locales/zh-tw.json';
import arTranslations from './locales/ar.json';
import afTranslations from './locales/af.json';
import sqTranslations from './locales/sq.json';
import hyTranslations from './locales/hy.json';
import bnTranslations from './locales/bn.json';
import euTranslations from './locales/eu.json';
import bsTranslations from './locales/bs.json';
import bgTranslations from './locales/bg.json';
import caTranslations from './locales/ca.json';
import hrTranslations from './locales/hr.json';
import csTranslations from './locales/cs.json';
import daTranslations from './locales/da.json';
import nlTranslations from './locales/nl.json';
import etTranslations from './locales/et.json';
import tlTranslations from './locales/tl.json';
import fiTranslations from './locales/fi.json';
import elTranslations from './locales/el.json';

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  pt: { translation: ptTranslations },
  'pt-br': { translation: ptBrTranslations },
  it: { translation: itTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  zh: { translation: zhTranslations },
  'zh-tw': { translation: zhTwTranslations },
  ar: { translation: arTranslations },
  af: { translation: afTranslations },
  sq: { translation: sqTranslations },
  hy: { translation: hyTranslations },
  bn: { translation: bnTranslations },
  eu: { translation: euTranslations },
  bs: { translation: bsTranslations },
  bg: { translation: bgTranslations },
  ca: { translation: caTranslations },
  hr: { translation: hrTranslations },
  cs: { translation: csTranslations },
  da: { translation: daTranslations },
  nl: { translation: nlTranslations },
  et: { translation: etTranslations },
  tl: { translation: tlTranslations },
  fi: { translation: fiTranslations },
  el: { translation: elTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;