/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Layout from './Layout';
import { rendererWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';

const store = initStore();

describe('<Layout />', () => {
  it('rendered correctly', () => {
    const component = rendererWithIntl(
      <Provider store={store}>
        <Layout title='Title' />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
