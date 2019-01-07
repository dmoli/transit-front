/* eslint-env jest */
import React from 'react';

import Header from './Header';
import { rendererWithIntl } from '../../../scripts/intl-enzyme-test-helper';

describe('<Header />', () => {
  it('should rendered correctly', () => {
    const component = rendererWithIntl(
      <Header />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
