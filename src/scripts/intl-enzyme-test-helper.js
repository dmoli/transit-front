/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../lang/es'); // en.json

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'es', messages }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

/**
 * Export shallow whith Intl
 */
export function shallowWithIntl(node) {
  return shallow(nodeWithIntlProp(node), { context: { intl } });
}

/**
 * Export mount whith Intl
 */
export function mountWithIntl(node) {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape },
  });
}

/**
 * Export renderer whith Intl
 */
export function rendererWithIntl(children, props = { locale: 'en' }) {
  return (
    renderer.create(
      <IntlProvider {...props}>
        {children}
      </IntlProvider>,
    )
  );
}
