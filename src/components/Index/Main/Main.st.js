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
const store = initStore();

storiesOf('Index/Main', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Main',
    withInfo('Main - loading')(() =>
      <Main
        error={null}
        errorShape={null}
        loadShape={false}
        routes={initState}
        favourites={[]}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
      />,
    ),
  )
  .add('Main - error',
    withInfo('Main - error')(() =>
      <Main
        error={'error'}
        errorShape={null}
        loadShape={false}
        routes={initState}
        favourites={[]}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
      />,
    ),
  )
  .add('Main - success',
    withInfo('Main - success')(() =>
      <Main
        error={null}
        errorShape={null}
        loadShape={false}
        routes={state}
        favourites={[]}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
      />,
    ),
  )
  .add('Main - loading shape',
    withInfo('Main - loading shape')(() =>
      <Main
        error={null}
        errorShape={null}
        loadShape={false}
        routes={state}
        favourites={[]}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
      />,
    ),
  );
