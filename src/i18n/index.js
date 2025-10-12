import enMessages from './messages/en.json';
import deMessages from './messages/de.json';
import esMessages from './messages/es.json';

export const locales = {
  en: 'English',
  de: 'Deutsch',
  // es: 'Español',
};

export const messages = {
  en: enMessages,
  de: deMessages,
  es: esMessages,
};

export const defaultLocale = 'en';

export const getLocaleFromUrl = () => {
  const hash = window.location.hash;
  const path = hash.replace('#', '');
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales[firstSegment]) {
    return firstSegment;
  }

  return null;
};

export const getUserLocale = () => {
  const urlLocale = getLocaleFromUrl();
  if (urlLocale) {
    return urlLocale;
  }

  const browserLocale = navigator.language.split('-')[0];
  return locales[browserLocale] ? browserLocale : defaultLocale;
};
