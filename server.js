// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const { readFileSync } = require('fs');
const { basename } = require('path');
const { createServer } = require('http');
const accepts = require('accepts');
const glob = require('glob');
const next = require('next');
const { parse } = require('url');

// es falso en producción
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// obtiene el soporte de lenguajes encontrados en la carpeta `lang/` dir. [ 'en', 'fr' ]
const languages = glob.sync('./src/lang/*.json').map(f => basename(f, '.json'));

// se necesita pasar la variable locale de la solicitud del usuario a React Intls.
// Esta función también guardará en caché el script lang en memoria
const localeDataCache = new Map();
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

// Cargar las traducciones en base al locale solicitado
const getMessages = function getMessages(locale) {
  return require(`./src/lang/${locale}.json`); // eslint-disable-line global-require
};

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    // const { pathname, query } = parsedUrl; decomment to friendly url

    // Accept obtiene información de la solicitud
    const accept = accepts(req);

    // languages retornará el array de lenguajes incluídos en (./src/lang/*.json)
    // const locale = accept.language(languages);

    // por defecto cargaremos siempre en español
    const locale = 'es';

    req.locale = locale;

    // cache data
    req.localeDataScript = getLocaleDataScript(locale);

    // obtener los mensajes del idioma respectivo
    req.messages = getMessages(locale);

    // decomment to friendly url
    // if (pathname === '/create-property') {
    //   app.render(req, res, '/dashboard', query);
    // } else {
    //   handle(req, res, parsedUrl);
    // }
    handle(req, res, parsedUrl);
  }).listen(3001, (err) => {
    if (err) throw err;
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('> Read on http://localhost:3001');
  });
});

/*
i had to pass this logic above
server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { title: req.params.id }
  app.render(req, res, actualPage, queryParams)
})
*/
