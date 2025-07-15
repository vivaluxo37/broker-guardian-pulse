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
import heTranslations from './locales/he.json';
import hiTranslations from './locales/hi.json';
import huTranslations from './locales/hu.json';
import isTranslations from './locales/is.json';
import idTranslations from './locales/id.json';
import gaTranslations from './locales/ga.json';
import lvTranslations from './locales/lv.json';
import ltTranslations from './locales/lt.json';
import mkTranslations from './locales/mk.json';
import msTranslations from './locales/ms.json';
import neTranslations from './locales/ne.json';
import noTranslations from './locales/no.json';
import faTranslations from './locales/fa.json';
import plTranslations from './locales/pl.json';
import roTranslations from './locales/ro.json';
import ruTranslations from './locales/ru.json';
import srTranslations from './locales/sr.json';
import skTranslations from './locales/sk.json';
import slTranslations from './locales/sl.json';
import swTranslations from './locales/sw.json';
import svTranslations from './locales/sv.json';
import thTranslations from './locales/th.json';
import trTranslations from './locales/tr.json';
import ukTranslations from './locales/uk.json';
import urTranslations from './locales/ur.json';
import viTranslations from './locales/vi.json';
import cyTranslations from './locales/cy.json';
import zuTranslations from './locales/zu.json';

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
  he: { translation: heTranslations },
  hi: { translation: hiTranslations },
  hu: { translation: huTranslations },
  is: { translation: isTranslations },
  id: { translation: idTranslations },
  ga: { translation: gaTranslations },
  lv: { translation: lvTranslations },
  lt: { translation: ltTranslations },
  mk: { translation: mkTranslations },
  ms: { translation: msTranslations },
  ne: { translation: neTranslations },
  no: { translation: noTranslations },
  fa: { translation: faTranslations },
  pl: { translation: plTranslations },
  ro: { translation: roTranslations },
  ru: { translation: ruTranslations },
  sr: { translation: srTranslations },
  sk: { translation: skTranslations },
  sl: { translation: slTranslations },
  sw: { translation: swTranslations },
  sv: { translation: svTranslations },
  th: { translation: thTranslations },
  tr: { translation: trTranslations },
  uk: { translation: ukTranslations },
  ur: { translation: urTranslations },
  vi: { translation: viTranslations },
  cy: { translation: cyTranslations },
  zu: { translation: zuTranslations },
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