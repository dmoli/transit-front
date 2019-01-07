/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';

import Layout from './Layout';
import { initStore } from '../../../redux/store';

const store = initStore();

storiesOf('App/Layout', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Layout',
    withInfo('Layout principal de la webapp')(() =>
      <Layout title='Title' />,
    ),
  );
