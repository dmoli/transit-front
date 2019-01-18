/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import Tabs from './Tabs';
import { initStore } from '../../../redux/store';

const store = initStore();

storiesOf('Index/Tabs', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Tabs',
    withInfo('Tabs')(() =>
      <Tabs
        onChangeTab={action('onChangeTab')}
      />,
    ),
  )
  .add('Tabs - with favourite',
    withInfo('Tabs - with favourite')(() =>
      <Tabs
        onChangeTab={action('onChangeTab')}
        favouritesCount={19}
      />,
    ),
  );
