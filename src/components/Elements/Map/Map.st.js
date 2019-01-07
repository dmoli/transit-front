/* eslint import/no-extraneous-dependencies: [0] */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

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

storiesOf('Elements/Map', module)
  .add('Macardores', () => (
    <Container>
      <Map
        center={center}
        markers={markers}
        zoomCustom={17}
      />
    </Container>
  ));

const Container = styled.div`
  width: 50%;
  height: 400px;
`;
