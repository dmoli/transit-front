/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

const createComponentWithIntl = (children, props = { locale: 'en' }) => (
  renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>,
  )
);

export default createComponentWithIntl;
