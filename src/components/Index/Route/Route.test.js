/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Route from './Route';
import { mountWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';

const store = initStore();

describe('<Route />', () => {
  it('should rendered correctly', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Route />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
