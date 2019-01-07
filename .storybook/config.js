import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl/dist/preview';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

// importar lang
import langEs from '../src/lang/es.json';
import langEn from '../src/lang/en.json';

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);

// Provide your messages
const messages = {
  'es': langEs,
  'en': langEn
};

const getMessages = (locale) => messages[locale];

// Set intl configuration
setIntlConfig({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  getMessages,
});

// Register decorator
addDecorator(withIntl);

const req = require.context('../src/components', true, /\.st\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

// Run storybook
configure(loadStories, module);
