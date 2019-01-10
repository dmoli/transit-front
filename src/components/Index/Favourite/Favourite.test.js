/* eslint-env jest */
import React from 'react';
import { Provider } from 'react-redux';

import Favourite from './Favourite';
import { mountWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import { initStore } from '../../../redux/store';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();
const route = routes[0];
const store = initStore();

describe('<Favourite />', () => {
  it('should rendered correctly', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Favourite
          item={route}
          onClickToggleFavorite={() => {}}
          onClickCurrent={() => {}}
        />,
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
