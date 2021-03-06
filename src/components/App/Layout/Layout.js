/* global FRONT_URL */
import Head from 'next/head';
import { defineMessages, injectIntl } from 'react-intl';
import styled from 'styled-components';

const messages = defineMessages({
  title: {
    id: 'page.title',
    defaultMessage: 'Transit - Smart Mobility',
  },
});

/**
 * Layout principal de la webapp
 */
export default injectIntl(({
  intl,
  title,
  children,
}) => (
  <div>
    <Head>
      <title>{ title || intl.formatMessage(messages.title) }</title>
      <meta property="og:title" content={ title || intl.formatMessage(messages.title) } />
      <meta property="og:image" content={ `${FRONT_URL}/static/logo-head.jpg` } />
      <meta property="og:description" content='Smart Mobility' />
      <meta property="og:site_name" content='Transit' />
      <meta property="og:type" content="website" />
      <meta charSet='utf-8' />
      <meta name="viewport"
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      <link href="https://fonts.googleapis.com/css?family=Poppins|Muli:300,400,700" rel="stylesheet" />
      <link rel='stylesheet' type='text/css' href='/static/css/style.css' />
      <link rel='apple-touch-icon' sizes='57x57' href='/static/favicons/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='/static/favicons/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/static/favicons/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/static/favicons/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='/static/favicons/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/static/favicons/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/static/favicons/apple-icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/static/favicons/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' sizes='192x192'
        href='/static/favicons/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='/static/favicons/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
      <link rel='manifest' href='/static/favicons/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/static/favicons/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
    <Main>
      { children }
    </Main>
  </div>
));

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
`;
