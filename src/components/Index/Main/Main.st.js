/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';

import Main from './Main';
import { initStore } from '../../../redux/store';

const store = initStore();

storiesOf('Index/Main', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Main',
    withInfo('Main')(() =>
      <Main />,
    ),
  );
