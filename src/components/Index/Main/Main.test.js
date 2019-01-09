/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Main from './Main';
import { mountWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();
const initState = {
  entities: [],
  page: 1,
};
const state = {
  entities: routes,
  page: 1,
};

const store = initStore();

describe('<Main />', () => {
  it('should rendered correctly - loading', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          error={null}
          routes={initState}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should rendered correctly - error', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          error={'error'}
          routes={initState}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should rendered correctly - success', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          error={null}
          routes={state}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
