import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {es, en} from './src/locale';

const resources = {
  es,
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'es',
  fallbackLng: 'es',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
