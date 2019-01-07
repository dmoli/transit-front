/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './Header';

storiesOf('App/Header', module)
  .add('Header',
    withInfo('Header')(() =>
      <Header />,
    ),
  );
