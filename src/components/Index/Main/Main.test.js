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
const favouriteState = {
  entities: routes,
  page: 1,
};


const store = initStore();

describe('<Main />', () => {
  it('should rendered correctly - loading', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          init={false}
          error={null}
          errorSearch={null}
          errorShape={null}
          loadShape={false}
          loadSearch={null}
          routes={initState}
          favourites={favouriteState}
          onClickToggleFavorite={() => {}}
          onClickCurrent={() => {}}
          onNextPage={() => {}}
          onSearchRoutes={() => {}}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should rendered correctly - error', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          init={false}
          error={'error'}
          errorSearch={null}
          errorShape={null}
          loadShape={false}
          loadSearch={null}
          routes={initState}
          favourites={favouriteState}
          onClickToggleFavorite={() => {}}
          onClickCurrent={() => {}}
          onNextPage={() => {}}
          onSearchRoutes={() => {}}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('should rendered correctly - success', () => {
    const component = mountWithIntl(
      <Provider store={store}>
        <Main
          init={false}
          error={null}
          errorSearch={null}
          errorShape={null}
          loadShape={false}
          loadSearch={null}
          routes={state}
          favourites={favouriteState}
          onClickToggleFavorite={() => {}}
          onClickCurrent={() => {}}
          onNextPage={() => {}}
          onSearchRoutes={() => {}}
        />
      </Provider>,
    );
    expect(component.html()).toMatchSnapshot();
  });
});
