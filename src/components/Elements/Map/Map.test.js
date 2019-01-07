/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Map from './Map';

const center = { lat: -33.4314474, lng: -70.6093325 };
const markers = [
  {
    lat: -33.4314474,
    lng: -70.6093325,
    show: true,
  },
  {
    lat: -33.4533624,
    lng: -70.714299,
    show: true,
  },
];
describe('<Map />', () => {
  it('should rendered correctly', () => {
    const wrapper = mount(
      <Map
        center={center}
        markers={markers}
        zoomCustom={17}
      />,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
