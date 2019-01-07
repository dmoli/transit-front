/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Tabs from './Tabs';
import { mountWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';

const store = initStore();

describe('<Tabs />', () => {
  it('should rendered correctly', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Tabs onChangeTab={() => {}} />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
