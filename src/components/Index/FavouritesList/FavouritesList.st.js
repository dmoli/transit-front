/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';

import FavouritesList from './FavouritesList';
import { initStore } from '../../../redux/store';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();
const store = initStore();

storiesOf('Index/FavouritesList', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('FavouritesList',
    withInfo('FavouritesList')(() =>
      <FavouritesList
        items={routes}
        onClickToggleFavorite={action('onClickToggleFavorite')}
      />,
    ),
  );
