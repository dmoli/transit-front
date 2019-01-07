/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ButtonBasic from './ButtonBasic';

describe('<ButtonBasic />', () => {
  it('should rendered correctly', () => {
    const component = renderer.create(
      <ButtonBasic
        className='btn'
        type='button'
        disabled={false}
        onClick={() => {}}
      >
        Haz click
      </ButtonBasic>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
