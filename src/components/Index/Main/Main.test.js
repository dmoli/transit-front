/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Main from './Main';
import { mountWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';

const store = initStore();

describe('<Main />', () => {
  it('should rendered correctly', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
