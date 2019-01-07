/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import ButtonBasic from './ButtonBasic';

storiesOf('Elements/ButtonBasic', module)
  .add('Default',
    withInfo('')(() => {
      const styleWrap = {
        padding: '10px',
      };
      return (
        <div style={styleWrap}>
          <ButtonBasic
            className='btn'
            type='button'
            disabled={false}
            onClick={action('onClick')}
          >
            Haz click
          </ButtonBasic>
        </div>
      );
    }),
  );
