/* eslint-env jest */
import React from 'react';

import RouterList from './RouterList';
import { rendererWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();

describe('<RouterList />', () => {
  it('should rendered correctly', () => {
    const component = rendererWithIntl(
      <RouterList
        items={routes}
        onClickToggleFavorite={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
