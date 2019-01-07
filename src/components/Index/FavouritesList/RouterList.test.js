/* eslint-env jest */
import React from 'react';

import FavouritesList from './FavouritesList';
import { rendererWithIntl } from '../../../scripts/intl-enzyme-test-helper';
import * as routeFixure from '../../../fixtures/route';

const routes = routeFixure.get();

describe('<FavouritesList />', () => {
  it('should rendered correctly', () => {
    const component = rendererWithIntl(
      <FavouritesList
        items={routes}
        onClickToggleFavorite={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
