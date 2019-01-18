/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import Main from './Main';
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

storiesOf('Index/Main', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Main - loading',
    withInfo('Main - loading')(() =>
      <Main
        init={true}
        error={null}
        errorSearch={null}
        errorShape={null}
        loadShape={null}
        loadSearch={null}
        routes={initState}
        favourites={favouriteState}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
        onNextPage={action('onNextPage')}
        onSearchRoutes={action('onSearchRoutes')}
      />,
    ),
  )
  .add('Main - error',
    withInfo('Main - error')(() =>
      <Main
        init={false}
        error={'error'}
        errorShape={null}
        loadShape={null}
        loadSearch={null}
        routes={initState}
        favourites={favouriteState}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
        onNextPage={action('onNextPage')}
        onSearchRoutes={action('onSearchRoutes')}
      />,
    ),
  )
  .add('Main - success',
    withInfo('Main - success')(() =>
      <Main
        init={false}
        error={null}
        errorSearch={null}
        errorShape={null}
        loadShape={null}
        loadSearch={null}
        routes={state}
        favourites={favouriteState}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
        onNextPage={action('onNextPage')}
        onSearchRoutes={action('onSearchRoutes')}
      />,
    ),
  )
  .add('Main - loading shape',
    withInfo('Main - loading shape')(() =>
      <Main
        init={false}
        error={null}
        errorSearch={null}
        errorShape={null}
        loadShape={true}
        loadSearch={null}
        routes={state}
        favourites={favouriteState}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
        onNextPage={action('onNextPage')}
        onSearchRoutes={action('onSearchRoutes')}
      />,
    ),
  );
