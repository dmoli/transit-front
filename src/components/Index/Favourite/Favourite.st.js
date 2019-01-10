/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import Favourite from './Favourite';
import { initStore } from '../../../redux/store';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();
const route = routes[0];
const store = initStore();

storiesOf('Index/Favourite', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Favourite',
    withInfo('Favourite')(() =>
      <Favourite
        item={route}
        onClickToggleFavorite={action('onClickToggleFavorite')}
        onClickCurrent={action('onClickCurrent')}
      />,
    ),
  );
